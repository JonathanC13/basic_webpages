import { useState, useEffect, useRef, useCallback } from 'react'
import apiRequest from '../api/apiRequest'

const useAPIFetch = (dataURL) => {
    // must keep same ref of the mount to track
    const isMounted = useRef(false)
    // keep ref of the abortcontroller so that the correct controller can be aborted 
    const controller = useRef(new AbortController())
    const signal = useRef(controller.signal)

    // states for the fetch
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [APIError, setAPIError] = useState(null)

    // need the function to useCallback so that the component has the same reference of this function
    const fetchData = useCallback(async() => {
        setIsLoading(true)

        const paramsObj = {
            method: 'get',
            signal: signal.current
        }

        const response = await apiRequest(dataURL, paramsObj)

        if (isMounted.current) {
            if (response['status'] === 'error') {
                setData([])
                setAPIError(response['message'])
            } else {
                setData(response['message'])
                setAPIError(null)
            }
        }

        //isMounted.current && setTimeout(() => {setIsLoading(false)}, 2000)
        isMounted.current && setIsLoading(false)

    }, [dataURL])

    //  on load
    // if fetchData reference changes, setup needs to run again to fetch initial data.
    useEffect(() => {
        // on load, it is mounted
        isMounted.current = true;

        // assign new obj on load
        controller.current = new AbortController()
        signal.current = controller.current.signal
        fetchData()

        const cleanup = () => {
            isMounted.current = false
            controller.current.abort()
        }

        return cleanup
    }, [fetchData])

    // callback for the component
    const fetchDataCB = () => {
        controller.current = new AbortController()
        signal.current = controller.current.signal
        fetchData()
    }

    // return the states and callback function for re-fetch
    return { data, isLoading, APIError, fetchDataCB}
}

export default useAPIFetch