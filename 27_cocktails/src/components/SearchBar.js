import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setData } from '../store/slices/dataSlice/dataSlice'

const SearchBar = () => {
    
    const searchTerm = useSelector((state) => state.data.searchTerm)
    const dispatch = useDispatch()
  
    const handleAddItem = () => {
      console.log('hi: ', searchTerm)
      dispatch(setData([searchTerm]))
      return
    }

    console.log('Searchbar rerender')

  return (
    <form className='AddItem__form addForm' onSubmit={(e) => {e.preventDefault()}}>
        <label htmlFor="addItem" className='itemForm__label offscreen'>Controlled input</label>
        <input 
            className='placeholder'
            type="text" 
            placeholder='e.g. Mazda Miata'
            value={searchTerm}
            onChange={(e) => {dispatch(setSearchTerm(e.target.value))}}
        />
        <button className='itemForm__button cursor_pointer' type='submit' onClick={handleAddItem}>
            <span className='itemForm__button__span'>Submit</span>
        </button>
    </form>
  )
}

export default SearchBar