import React from 'react'
import SearchBar from './SearchBar'
import Cocktails from './Cocktails'

const Home = () => {

  console.log("home rerender")

  return (
    <section className='Home'>
      <SearchBar></SearchBar>
      <Cocktails></Cocktails>
    </section>
  )
}

export default Home