import './App.css';
import Header from './components/Header'
import Categories from './components/Categories'
import { useState, useEffect } from 'react'
import useAPIFetch from '../src/hooks/useAPIFetch';
import Menu from './components/Menu'

function App() {
  const url = 'http://localhost:3500/menu'

  const [category, setCategory] = useState('All')
  const [menuInfo, setMenuInfo] = useState([])

  const {data, isLoading, apiErr, apiFetchCb} = useAPIFetch(url)

  useEffect(() => {
    setMenuInfo(data)
  }, [data, setMenuInfo])

  const handleCatSelected = (categorySelected) => {
    setCategory(categorySelected)
  }

  return (
    <div className="App">
      <Header title='Our Menu'></Header>
      {isLoading && <p>Menu is loading!</p>}
      {apiErr && <p style={{color:'red'}}>Error: {apiErr}</p>}
      {!isLoading && !apiErr && (
      <>
        <Categories
          menuInfo={menuInfo}
          categorySelected={category}
          handleCatSelected={handleCatSelected}
        ></Categories>
        <Menu
          categorySelected={category}
          menuInfo={menuInfo}
        />
      </>
      )}
    </div>
  );
}

export default App;
