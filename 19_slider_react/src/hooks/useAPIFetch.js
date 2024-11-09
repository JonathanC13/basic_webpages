import { useState, useEffect, useRef, useCallback } from 'react'
import apiRequest from '../api/apiRequest'
import AbortController from 'abort-controller'

const useAPIFetch = (dataURL) => {
    // persistent value between renders
    const isMounted = useRef(false)
    const controller = useRef(new AbortController())
    const signal = useRef(controller.current.signal)

    // states to make this custom hook. When these states changes it will re-render the component that uses this hook
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [APIErr, setAPIErr] = useState(null)

    // useCallback caches the function between renders if the dependencies are the same
    // Need the reference to be the same since useEffect uses it so this prevents it from firing unecessarily
    const fetchData = useCallback(async(url) => {
        setIsLoading(true);

        const paramsObj = {
            method: 'get',
            signal: signal.current
        }

        const response = await apiRequest(url, paramsObj)

        if (isMounted.current) {
            if (response['status'] === 'error') {
                setData([])
                setAPIErr(response['message'])
            } else {
                setData(response['message'])
                setAPIErr(null)
            }
        }

        isMounted.current && setIsLoading(false)

    }, [setData, setIsLoading, setAPIErr])

    // useEffect to load the initial data.
    // since this uses fetchData(), need it as a dependency and so fetchData() needs to use useCallback to cache the definition between renders so this does not fire again and again
    useEffect(() => {
        isMounted.current = true
        controller.current = new AbortController()
        signal.current = controller.current.signal

        fetchData(dataURL)

        const cleanup = () => {
            isMounted.current = false;
            controller.current.abort()
        }

        return cleanup
        
    }, [dataURL, fetchData])

    // callback function for the component that uses this hook. Also needs useCallback so the component has the same definition of the callback function
    const fetchDataCb = useCallback(() => {
        controller.current = new AbortController()
        signal.current = controller.current.signal

        fetchData(dataURL)
    }, [dataURL, fetchData])

    return { data, isLoading, APIErr, fetchDataCb}
}

export default useAPIFetch