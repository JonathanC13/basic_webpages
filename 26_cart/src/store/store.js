import { createStore, action, thunk, computed } from 'easy-peasy'
import { apiRequest } from '../api/apiRequest'

const store = createStore({
    // store states
    url: 'http://localhost:3500/cart',
    urlReset: 'http://localhost:3500/items_original',
    items: [],
    isLoading: false,
    APIError: null,
    apiFetchCb: () => {},
    // store actions
    setItems: action((state, payload) => {
        state.items = payload
    }),
    setIsLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    setAPIError: action((state, payload) => {
        state.APIError = payload
    }),
    setApiFetchCb: action((state, payload) => {
        state.apiFetchCb = payload
    }),
    
    // computed
    getItemById: computed((state) => {
        return (id) => state.items.find((itm) => {return itm['id'] === id.toString()})
    }),
    getTotalQuant: computed((state) => {

        let totalQuant = 0;

        state.items.forEach((itm) => {
            totalQuant += itm['amount']
        })

        return totalQuant
    }),
    getTotalPrice: computed ((state) => {
        let total = 0
        state.items.forEach((itm) => {
            total += (Number(itm['price']) * Number(itm['amount']))
        })

        return parseFloat(total).toFixed(2)
    }),

    // store thunks
    reset: thunk(async (actions, payload, helpers) => {
        // TODO REDO
        // payload is {url:url, urlReset: urlReset}

        actions.setIsLoading(true)

        // get the data from the urlReset
        const url = payload['url']
        const urlReset = payload['urlReset']

        const paramsObj = {
            method:'get'
        }

        const response = await apiRequest(urlReset, paramsObj)

        if (response['status'] !== 'ok') {
            console.log(response['message'])
            actions.setAPIError(response['message'])
            actions.setIsLoading(false)
            return
        }

        // PUT request to create/replace each item in resource cart
        const { items, apiFetchCb } = helpers.getState()
        const items_og = response['message']
        
        for (let itm of items_og) {
            const replace = items.find((i) => {return i['id'] === itm['id']})
            
            const paramsObj = {
                method: replace ? 'PUT' : 'POST',
                body: JSON.stringify(itm),
                headers: {
                    "Content-Type": "application/json",
                  }
            }

            const urlReq = url + (replace ? `/${itm['id']}` : '')
            const response = await apiRequest(urlReq, paramsObj)

            if (response['status'] !== 'ok') {
                console.log(response['message'])
                actions.setAPIError(response['message'])
            } else {
                actions.setAPIError(null)
            }
        }
        actions.setIsLoading(false)
    }),
    deleteItem: thunk(async (actions, payload, helpers) => {
        // payload; id

        const { url, items } = helpers.getState()

        try {
            const paramsObj = {
                method: 'DELETE'
            }

            const response = await apiRequest(`${url}/${payload}`, paramsObj)

            if (response['status'] !== 'ok') {
                throw new Error(response['message'])
            }

            const itemsList = items.filter((itm) => {
                return itm['id'] !== payload
            })

            actions.setItems(itemsList)
        } catch (err) {
            actions.setAPIError(err.message || err.response)
        }
    }),
    changeItemQuant: thunk(async (actions, payload, helpers) => {
        // payload; specific object

        const { url, items } = helpers.getState()
        const { id, amount } = payload

        const paramsObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }

        if (amount === 0) {
            actions.deleteItem(id)
            return
        }

        try {
            const response = await apiRequest(`${url}/${id}`, paramsObj)
            
            if (response['status'] !== 'ok') {
                throw new Error(response['message'])
            }

            const itemsList = items.map((itm) => {
                return (itm['id'] === id ? payload : itm)
            })

            actions.setItems(itemsList)
            
        } catch (err) {
            actions.setAPIError(err.message || err.response)
        }
    })
})

export default store