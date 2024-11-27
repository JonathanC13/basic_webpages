import { createStore, action, thunk } from 'easy-peasy'

const store = createStore({
    // store states
    items: [],
    loading: false,
    APIError: null,
    apiFetchCb: () => {},
    // store actions

    // store thunks
    initFetch: thunk(async (actions, payload, helpers) => {
        // App will call this once on load
        //const { data, APIError, isLoading, apiFetchCb } = useApiFetch('http://localhost:3500/posts');
        // the question is since useApiFetch is a custom hook. will it 
        actions.setData(data)
        actions.setAPIError(APIError)
        actions.setLoading(isLoading)
        actions.setAPIFetchCb(apiFetchCb)
        // sets apiFetchCb for refetch
    }),
    refetch: thunk(async (actions, payload, helpers) => {
        /*
        set loading = true
        
        attempt apiFetchCb
        */
    }) 
})

export default store