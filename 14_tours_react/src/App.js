import './css/App.css';
import Header from './components/Header';
import { useState, useEffect, useRef } from 'react'
import Tours from './components/Tours';
import apiRequest from './api/apiRequest'; // just for App2. Purpose: not using a custom hook to handle API
import useAPIFetch from './hooks/useAPIFetch'

function App() {

  const url = 'http://localhost:3500/tours'

  const [tours, setTours] = useState([])
  const { data, isLoading, APIError, fetchData } = useAPIFetch(url);

  // on load, set the tours
  useEffect(() => {
    // temp
    // const obj = [
    //   {
    //       id: "1",
    //       name: "Tour 1",
    //       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       image: "https://picsum.photos/1280/720",
    //       price: "1,995"
    //   },
    //   {
    //     id: "2",
    //     name: "Tour 2",
    //     info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    //     image: "https://picsum.photos/1280/720",
    //     price: "1,995"
    //   }
    // ]
    setTours(data)
  }, [data, setTours])

  const handleNotInterested = (id) => {
    const newTourList = tours.filter((tour) => (
      (tour.id).toString() !== id
    ))

    setTours(newTourList)
  }

  const handleRefreshTours = () => {
    fetchData();
  }

  return (
    <div className="App">
      <Header
        toursLen={tours.length}
      ></Header>
      <Tours 
        tours={tours}
        handleNotInterested={handleNotInterested}
        isLoading={isLoading}
        APIError={APIError}
        handleRefreshTours={handleRefreshTours}
      />
    </div>
  );
}

export default App;


////////////// without custom hook for api, LOL, essentially the same, just no useCallback on the fetchData because on re-render it can just re-render too. With custom hook need to keep same reference by not re-creating.
const App2 = () => {
  // ref for mount
  const isMounted = useRef(false)
  const controller = useRef(new AbortController())
  const signal = useRef(controller.signal)

  const url = 'http://localhost:3500/tours'
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [APIError, setAPIError] = useState(null)

  const fetchData = async() => {
    setIsLoading(true)

    const paramsObj = {
      method:'get',
      signal: signal.current
    }

    const response = await apiRequest(url, paramsObj);

    if (isMounted.current) {
      if (response.status === 'error') {
        setTours([])
        setAPIError(response.message)
      } else {
        setTours(response.message)
        setAPIError(null)
      }

      isMounted && setIsLoading(false)
    }
  }

  // on load, populate the tours
  useEffect(() => {
    // on first render
    isMounted.current = true

    fetchData()

    const cleanUp = () => {
      // if clean up is called, this component was unmounted
      isMounted.current = false;
      controller.current.abort()
    }

    return cleanUp
  }, [controller])

  const handleRefresh = () => {
    fetchData()
  }

  return (
    <></>
  )
}