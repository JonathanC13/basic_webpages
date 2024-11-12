import {useState, useEffect, useRef, useCallback} from 'react'
import apiRequest from '../api/apiRequest'
import AbortController from 'abort-controller'

const useAPIFetch = (dataURL) => {
    const isMounted = useRef(false)
    const controller = useRef(new AbortController())
    const signal = useRef(controller.current.signal)

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [APIErr, setAPIErr] = useState(null)

    const apiFetch = useCallback(async(url) => {
        setIsLoading(true)
        // console.log('call to: ', url)
        const paramsObj = {
            method:'get',
            signal:signal.current
        }

        const response = await apiRequest(url, paramsObj)

        if (isMounted.current) {
            if (response['status'] === 'error') {
                setData('')
                setAPIErr(response['message'])
            } else {
                setData(response['message'])
                setAPIErr(null)
            }
            setIsLoading(false)
        }
    }, [setIsLoading, setData, setAPIErr])

    useEffect(() => {
        isMounted.current = true
        controller.current = new AbortController()
        signal.current = controller.current.signal

        apiFetch(dataURL)

        const cleanup = () => {
            isMounted.current = false
            controller.current.abort()
        }

        return cleanup
    }, [apiFetch, dataURL])

    const apiFetchCb = useCallback(() => {
        controller.current = new AbortController()
        signal.current = controller.current.signal

        apiFetch(dataURL)
    }, [apiFetch, dataURL])

    return {data, isLoading, APIErr, apiFetchCb}
}

export default useAPIFetch