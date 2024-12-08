import React from 'react'
import SearchBar from './SearchBar'
import Cocktails from './Cocktails'

const Home = () => {

  console.log("home rerender")

  return (
    <section>
      <h1>Home</h1>
      <SearchBar></SearchBar>
      <Cocktails></Cocktails>
    </section>
  )
}

export default Home