import './css/App.css';
import Header from './components/Header';
import { useState, useEffect } from 'react'
import Tours from './components/Tours';
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
