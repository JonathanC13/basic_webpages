import { useState, useEffect, useCallback, useRef } from 'react'
import apiRequest from '../api/apiRequest';

const useAPIFetch = (dataUrl) => {
    //On the next renders, useRef will return the same object. You can change its current property to store information and read it later
    const isMounted = useRef(false)
    // Need to hold reference for each render because we are creating a new reference on load useEffect and fetchDataCB(), so that if useEffect needs to cleanup it has access to the reference
    // If not use useRef and just let, 
    //      1. the useCallback will need 'signal' in the dependency array, but since 'signal' would be re-assigned each render it would re-create the function
    //      2. the useEffect will need 'controller' in the dependency array, but since 'controller' would be instantiated again in the useEffect it would cause useEffect to inifinitely run because the reference has changed.
    const controller = useRef(new AbortController())
    const signal = useRef(controller.signal)
    //const num = useRef(0)

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [APIError, setAPIError] = useState(null)
    //const [cleanupChk, setCleanupChk] = useState(false)  //**1. state to trigger useEffect
    
    // useCallback caches the function between renders if the dependencies are the same
    // Needed this in here because I made this a custom hook and it may re-render often if not useCallback
    const fetchData = useCallback(async() => {
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

    }, [dataUrl])

    // will run on load, depend fetchData and controller should not change unless re-mounted
    // After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values.
    useEffect(() => {
        isMounted.current = true
        
        // Must create new AbortController for each request
        controller.current = new AbortController()
        signal.current = controller.current.signal
        //num.current = 1
        fetchData()

        // if re-render dismounts the component that has this hook
        const cleanUp = () => {
            console.log("clean up function")
            isMounted.current = false;
            controller.current.abort();    // if request still in progress, cancel it
            //console.log(num.current)
        }

        return cleanUp
    }, [fetchData]) // cleanupChk   **2. Add state as dependency so that when changed it will cause re-render and it will run cleanup function first and then setup

    const fetchDataCB = useCallback(() => {
        // Must create new AbortController for each request
        controller.current = new AbortController()
        signal.current = controller.current.signal
        //num.current = 2
        
        fetchData()
        //setCleanupChk(true)  // **3. change the state to cause useEffect to run since it has this state as a dependency. Want to check that the controller created here is the one being aborted.
        
    }, [fetchData])

    return { 
        data, isLoading, APIError, fetchDataCB
    }
}

export default useAPIFetch;


