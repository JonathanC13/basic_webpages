import { useState, useEffect, useCallback, useRef } from 'react'
import apiRequest from '../api/apiRequest';
import AbortController from 'abort-controller'

const useAPIFetch = (dataUrl) => {
    //On the next renders, useRef will return the same object. You can change its current property to store information and read it later
    const isMounted = useRef(false)
    const controller = useRef(new AbortController())
    const signal = useRef(controller.signal)

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [APIError, setAPIError] = useState(null)
    
    // useCallback caches the function between renders if the dependencies are the same
    // Needed this in here because I made this a custom hook and it may re-render often if not useCallback
    const fetchData = useCallback( async() => {

        setIsLoading(true);

        const paramObj = {
            method: 'get',
            signal: signal.current
        }

        const apiFetch = async(url) => {
            const response = await apiRequest(url, paramObj);
            if (isMounted.current) {
                if (response.status === 'error') {
                    setAPIError(response.message);
                    setData([])
                } else {
                    setAPIError(null);
                    setData(response.message)
                }
            }

            // sim a delay
            //isMounted.current && setTimeout(() => {setIsLoading(false)}, 2000)

            isMounted.current && setIsLoading(false)
        }

        await apiFetch(dataUrl)

    }, [dataUrl, signal])

    // will run on load, depend fetchData and controller should not change unless re-mounted
    useEffect(() => {
        isMounted.current = true

        fetchData()

        // if re-render dismounts the component that has this hook
        const cleanUp = () => {
            console.log("clean up function")
            isMounted.current = false;
            controller.current.abort();    // if request still in progress, cancel it
        }

        return cleanUp
    }, [fetchData, controller])

    return { 
        data, isLoading, APIError, fetchData
    }
}

export default useAPIFetch;


