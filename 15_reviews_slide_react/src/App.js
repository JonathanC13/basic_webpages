import logo from './logo.svg';
import './App.css';
import useAPIFetch from './hook/useAPIFetch';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import ReviewContainer from './components/ReviewContainer'

function App() {
  const url = 'http://localhost:3500/reviews'

  const [reviews, setReviews] = useState([])

  const {data, isLoading, APIError, fetchDataCB} = useAPIFetch(url)

  useEffect(() => {
    setReviews(data)
  },[data, setReviews])


  return (
    <div className="App">
      <Header />
      {isLoading && <p>Loading Reviews!</p>}
      {APIError && <p style={{color:'red'}}>{APIError}</p>}
      {!isLoading && !APIError &&
        <ReviewContainer 
          reviews={reviews}
        />
      }
    </div>
  );
}

export default App;
