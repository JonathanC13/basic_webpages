import { useState, useEffect, useCallback } from "react";

const useTestHook = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const fakeFetch = useCallback(async (item) => {

        setIsLoading(true)

        setData([item])

        setTimeout(function() {
            setIsLoading(false)
        }, 1000);
        
    }, [setIsLoading, setData])

    useEffect(() => {
        fakeFetch('apples')
    }, [fakeFetch])

    const apiFetchCb = useCallback(() => {
        fakeFetch('bananas')
    }, [fakeFetch])

    return {isLoading, data, apiFetchCb}
}

export default useTestHook