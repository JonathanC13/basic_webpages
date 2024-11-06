import { useState, useRef, useEffect, useCallback } from 'react'
import AbortController from 'abort-controller'
import apiRequest from '../api/apiRequest'

const useAPIFetch = (dataURL) => {
    // refs
    const isMounted = useRef(false)
    const controller = useRef(new AbortController())
    const signal = controller.current.signal

    // states to make this a custom hook
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [APIErr, setAPIErr] = useState(null)

    const APIFetch = useCallback(async(dataURL) => {
        setIsLoading(true)
        const paramsObj = {
            method: 'get',
            signal: signal.current
        }

        const response = await apiRequest(dataURL, paramsObj)
        
        if (isMounted.current) {
            if (response.status === 'error') {
                setData([])
                setAPIErr(response.message)
            } else {
                setData(response.message)
                setAPIErr(null)
            }
        }

        isMounted.current && setIsLoading(false)

    }, [dataURL, setIsLoading, setData, setAPIErr])

    const execAPIFetch = () => {
        controller.current = new AbortController()
        signal.current = controller.current.signal

        APIFetch(dataURL)
    }

    // on hook load
    useEffect(() => {
        isMounted.current = true

        execAPIFetch()

        const cleanup = () => {
            isMounted.current = false
            controller.current.abort()
        }

        return cleanup
    }, [APIFetch])

    const APIFetchCb = () => {
        execAPIFetch()
    }

    return {data, isLoading, APIErr, APIFetchCb}
}

export default useAPIFetch