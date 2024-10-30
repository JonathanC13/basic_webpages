import { useState, useEffect, useCallback } from 'react'
import apiRequest from '../api/apiRequest';
import AbortController from 'abort-controller'

const useAPIFetch = (dataUrl) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [APIError, setAPIError] = useState(null)
    
    // useCallback caches the function between renders if the dependencies are the same
    // Needed this in here because I made this a custom hook and it may re-render often if not useCallback
    const fetchData = useCallback( async() => {
        const controller = new AbortController()
        const signal = controller.signal

        let isMounted = true;
        setIsLoading(true);

        const paramObj = {
            method: 'get',
            signal: signal
        }

        const apiFetch = async(url) => {
            const response = await apiRequest(url, paramObj);
            if (isMounted) {
                if (response.status === 'error') {
                    setAPIError(response.message);
                    setData([])
                } else {
                    setAPIError(null);
                    setData(response.message)
                }
            }

            // sim a delay
            //isMounted && setTimeout(() => {setIsLoading(false)}, 2000)

            isMounted && setIsLoading(false)
        }

        await apiFetch(dataUrl)

        const cleanUp = () => {
            console.log("clean up function")
            isMounted = false;
            controller.abort();    // if request still in progress, cancel it
        }

        return cleanUp

    }, [dataUrl])

    // will run on load and every time fetchData is exec
    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { 
        data, isLoading, APIError, fetchData
    }
}

export default useAPIFetch;


