import {useState, useEffect, useCallback, useRef} from 'react'
import {apiRequest} from '../api/apiRequest'
import AbortController from 'abort-controller'

const useAPIFetch = (dataUrl='') => {
    const isMounted = useRef(false)
    const controller = useRef(new AbortController())
    const signal = useRef(controller.current.signal)

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [APIError, setAPIError] = useState(null)

    const apiFetch = useCallback(async(url) => {
        setIsLoading(true)

        const paramsObj = {
            method:'get',
            signal:signal.current
        }

        const response = await apiRequest(url, paramsObj)

        if (isMounted.current) {
            if (response['status'] === 'ok') {
                setData(response['message'])
                setAPIError(null)
            } else {
                setData([])
                setAPIError(response['message'])
            }
            setTimeout(() => {setIsLoading(false)}, 2000);
            
        }

    }, [setData, setIsLoading, setAPIError])


    useEffect(() => {
        isMounted.current = true
        controller.current = new AbortController()
        signal.current = controller.current.signal

        apiFetch(dataUrl)

        const cleanup = () => {
            isMounted.current = false
            controller.current.abort()
        }

        return cleanup
    }, [dataUrl, apiFetch])

    const APIFetchCb = useCallback(() => {
        controller.current = new AbortController()
        signal.current = controller.current.signal
        console.log('fetching')
        apiFetch(dataUrl)

    }, [dataUrl, apiFetch])

    return {data, isLoading, APIError, APIFetchCb }

}

export default useAPIFetch