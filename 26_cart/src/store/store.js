import { createStore, action, thunk } from 'easy-peasy'
import { apiRequest } from '../api/apiRequest'

const store = createStore({
    // store states
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

    // store thunks
    // refetch: thunk(async (actions, payload, helpers) => {
    //     helpers.apiFetchCb()
    // })
    reset: thunk(async (actions, payload, helpers) => {
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
    })
    
})

export default store