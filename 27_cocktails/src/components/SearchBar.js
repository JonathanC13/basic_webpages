import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/slices/dataSlice/dataSlice'

const SearchBar = () => {
    
    const searchTerm = useSelector((state) => state.data.searchTerm)
    const dispatch = useDispatch()

    // console.log('Searchbar rerender')

  return (
    <form className='search_bar__form search_bar' onSubmit={(e) => {e.preventDefault()}}>
        <label htmlFor="search_input" className='search_bar__label'>Search Your Favourite Cocktail</label>
        <input 
            id='search_input'
            className='search_bar__input'
            type="text" 
            placeholder=''
            value={searchTerm}
            onChange={(e) => {dispatch(setSearchTerm(e.target.value))}}
        />
    </form>
  )
}

export default SearchBar