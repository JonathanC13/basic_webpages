import { createStore, action, thunk } from 'easy-peasy'
import { useRef } from 'react'
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
    
})

export default store