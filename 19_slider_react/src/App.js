import './App.css';
import Header from './components/Header'
import ReviewContainer from './components/ReviewContainer';
import { useState, useEffect } from 'react'
import useAPIFetch from './hooks/useAPIFetch'

function App() {
  const url = 'http://localhost:3500/Reviews'  

  const [reviews, setReviews] = useState([])
  const {data, isLoading, APIErr} = useAPIFetch(url)

  useEffect(() => {
    setReviews(data)
  }, [data, setReviews])

  return (
    <div className="App">
      <Header
        title="Reviews"
      />
      <ReviewContainer
        reviews={reviews}
      />
    </div>
  );
}

export default App;
