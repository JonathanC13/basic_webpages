import {useState, useEffect} from 'react'

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        handleResize(); // run handleResize()

        window.addEventListener("resize", handleResize);    // since add a listener, it on that event "resize" it will also run the function handleResize (callback func)

        // prevent memory leak by removing the eventlistener if when the dependencies have a state change that triggers this useEffect. Need to remove the event listener.
        // For [] the state changes when the file is reloaded or app is closed. Need to clean up the event listener
        const cleanUp = () => {
            //console.log("runs if a useEffect dep changes.")
            window.removeEventListener("resize", handleResize)  // remove this specific listener
        }

        return cleanUp; // exec the cleanUp func when the component is removed from the DOM
    }, []);

    return {windowWidth}
}

export default useWindowWidth