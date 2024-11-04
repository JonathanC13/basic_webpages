import { useState, useEffect, useRef, useCallback } from 'react'
import AbortController from 'abort-controller'
import apiRequest from '../api/apiRequest'

const useAPIFetch = (dataURL='') => {
    // mount and abort controller
    const isMounted = useRef(false)
    const controller = useRef(new AbortController())
    const signal = useRef(controller.current.signal)

    // states for the custom hook
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [apiErr, setApiErr] = useState(null)

    // need useCallback for this function so that the component that has this custom hook will have the same reference to this function when this re-renders due to other state changes
    const apiFetch = useCallback(async() => {
        setIsLoading(true)

        const paramsObj = {
            method: 'get',
            signal: signal.current
        }

        const response = await apiRequest(dataURL, paramsObj)

        if (isMounted) {
            if (response.status !== 'error') {
                setData(response.message);
                setApiErr(false)
            } else {
                setData([])
                setApiErr(response.message)
            }
        }

        isMounted && setIsLoading(false)

    }, [dataURL, setData, setApiErr, setIsLoading])

    // useEffect for on load of this hook
    useEffect(() => {
        isMounted.current = true

        // need a new Abort controller and signal each time we want to use apiFetch() since it could have been used already
        controller.current = new AbortController()
        signal.current = controller.current.signal
        // 
        apiFetch()

        const cleanup = () => {
            isMounted.current = false
            controller.current.abort()
        }

        return cleanup

    }, [apiFetch])

    // callback func for the component
    // this does not need to be useCallback since it reference the cached function
    const apiFetchCb = () => {
        // need a new Abort controller and signal each time we want to use apiFetch() since it could have been used already
        controller.current = new AbortController()
        signal.current = controller.current.signal
        
        apiFetch()
    }

    // remember that every time a state changes, this hook is returning. The components using this hook will also re-render.
    return {data, isLoading, apiErr, apiFetchCb}
}

export default useAPIFetch