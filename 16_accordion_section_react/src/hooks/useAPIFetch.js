import apiRequest from "../apiRequest/apiRequest";
import { useState, useEffect, useRef, useCallback } from 'react'
import AbortController from 'abort-controller'

// custom hook

const useAPIFetch = (dataUrl) => {
    // useRefs for caching the value between renders
    const isMounted = useRef(false);
    const controller = useRef(new AbortController())
    const signal = useRef(controller.current.signal)

    // states
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [APIError, setAPIError] = useState(null)

    // function is useCallback so that the component has the same reference to this function
    const apiRequestFetch = useCallback(async(url) => {
        setIsLoading(true)

        const paramsObj = {
            method: 'get',
            signal: signal.current
        }

        const response = await apiRequest(url, paramsObj)

        if (isMounted) {
            if (response.status === 'ok') {
                setData(response.message)
                setAPIError(null)
            } else {
                setData([])
                setAPIError(response.message)
            }
            
            isMounted && setIsLoading(false)
        }

    }, [dataUrl, setData, setIsLoading, setAPIError])

    // on load
    useEffect(() => {
        isMounted.current = true

        controller.current = new AbortController()
        signal.current = controller.current.signal

        apiRequestFetch(dataUrl)

        const cleanup = () => {
            isMounted.current = false;
            controller.current.abort();
        }

        return cleanup

    }, [dataUrl, apiRequestFetch])

    // callback for the component
    const apiRequestFetchCB = () => {
        controller.current = new AbortController()
        signal.current = controller.current.signal
        apiRequestFetch(dataUrl)
    }

    // return the states and callback function for re-fetch
    return { data, isLoading, APIError, apiRequestFetchCB}
}

export default useAPIFetch