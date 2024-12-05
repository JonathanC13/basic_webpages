import { createStore, action, thunk, computed } from 'easy-peasy'
import { apiRequest } from '../api/apiRequest'

const store = createStore({
    // store states
    url: 'http://localhost:3500/cart',
    urlReset: 'http://localhost:3500/items_original/1',
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
    getTotalPrice: computed ((state) => {
        let total = 0
        state.items.forEach((itm) => {
            total += itm['price']
        })

        return total
    }),

    // store thunks
    reset: thunk(async (actions, payload, helpers) => {
        // TODO REDO
        // payload is {url:url, urlReset: urlReset}

        actions.setIsLoading(true)

        // get the data from the urlReset
        const url = payload['url']
        const urlReset = payload['urlReset']

        console.log(url)

        let paramsObj = {
            method:'get'
        }

        let response = await apiRequest(urlReset, paramsObj)

        if (response['status'] !== 'ok') {
            console.log(response['message'])
            actions.setAPIError(response['message'])
            actions.setIsLoading(false)
            return
        }

        // PUT request to replace the data in url with the response
        paramsObj = {
            method:'PUT',
            // body: JSON.stringify(response['message']),
            body: JSON.stringify(response['message']),
            headers: {
                "Content-Type": "application/json",
              }
        }

        response = await apiRequest(url + '/1', paramsObj)

        if (response['status'] !== 'ok') {
            console.log(response['message'])
            actions.setAPIError(response['message'])
        } else {
            actions.setAPIError(null)
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