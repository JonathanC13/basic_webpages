import React from 'react'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/slices/dataSlice/dataSlice'

const SearchBar = () => {
    
    const initialAppMount = useSelector((state) => state.data.initialAppMount)  // Just used to hide the initial search term
    const searchTerm = useSelector((state) => state.data.searchTerm)
    const dispatch = useDispatch()

    const searchInput = useRef('')

    useEffect(() => {
      searchInput.current.focus()
    }, [])

    // console.log('Searchbar rerender')

  return (
    <form className='search_bar__form search_bar' onSubmit={(e) => {e.preventDefault()}}>
        <label htmlFor="search_input" className='search_bar__label'>Search Your Favourite Cocktail</label>
        <input 
            id='search_input'
            className='search_bar__input'
            type="text" 
            placeholder=''
            ref={searchInput}
            value={(initialAppMount) ? '' : searchTerm}
            onChange={(e) => {dispatch(setSearchTerm(e.target.value))}}
        />
    </form>
  )
}

export default SearchBar