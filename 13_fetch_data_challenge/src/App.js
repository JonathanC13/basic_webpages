import logo from './logo.svg';
import './App.css';
import Tabs from './Tabs';
import ItemsList from './ItemsList';
import apiRequest from './apiRequest';
import { useState, useEffect } from 'react'
import Table from './Table';

function App() {

  const API_ROOT = 'https://jsonplaceholder.typicode.com/'

  const [tabSelected, setTabSelected] = useState('users')
  const [objects, setObjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchErrMsg, setFetchErrMsg] = useState(null)

  // console.log('render')

  // only run when state of tabSelected has changed.
  // synchronizing with external resource, API
  useEffect(() => {
    setIsLoading(true)

    const fetchItems = async() => {
      // GET
      const reqURL = `${API_ROOT}${tabSelected}`
      const response = await apiRequest(reqURL)

      if (response['status'] === 'Error') {
        setFetchErrMsg(response['message']);
      } else {
        setObjects(response['message']);
        setFetchErrMsg(null);
      }

      setIsLoading(false)

      // 

    //   try {
    //     const reqURL = `${API_ROOT}${tabSelected}`
    //     const response = await fetch(reqURL);

    //     if (!response.ok) {
    //       throw Error('Error API error')
    //     }

    //     const responseJSON = await response.json();
        
    //     setObjects(responseJSON);
    //     setFetchErrMsg(null);
    //   } catch (err) {
    //       setFetchErrMsg(err.message);
    //   } finally {
    //     setIsLoading(false)
    //   }
    }

    // simulate delay from API. Exposed the message 'List is empty' when in reality it is still loading!
    // setTimeout(
    //   fetchItems, 2000
    // )

    fetchItems();
  }, [tabSelected]);

  const handleTabSelected = (selectedTab) => {
    // don't need to check against current state because if the state remains the same, it will not re-render.
    setTabSelected(selectedTab)
  }

  return (
    <div className="App">
      <Tabs
        tabSelected={tabSelected}
        handleTabSelected={handleTabSelected}
      />
      {fetchErrMsg && <p style={{color:'red', textAlign:'center'}}>{fetchErrMsg}</p>}
      {isLoading && <p style={{textAlign:'center'}}>List is loading!</p>}
      {/* Part A list {!fetchErrMsg && !isLoading &&
        <ItemsList
          objects={objects}
        />
      } */}
      {/* Part B table*/}
      {!fetchErrMsg && !isLoading &&
        <Table
          objects={objects}
        />
      }
    </div>
  );
}

export default App;
