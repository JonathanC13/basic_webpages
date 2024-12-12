import React from 'react'
import { useSelector } from 'react-redux'
import { useGetItemsQuery } from '../store/slices/api/apiSlice'
import CocktailItem from './CocktailItem'

const createDrinksComps = (items) => {
  if (items.length === 0) {
    return []
  }

  const comps = items.map((itm, idx) => {
    return (
      <CocktailItem 
          key={itm['idDrink']}
          cocktail={itm}
      >
      </CocktailItem>
    )
  })
  
  return comps
}

const Cocktails = () => {

    const searchTerm = useSelector((state) => state.data.searchTerm)

    // Calling the `useGetPostsQuery()` hook automatically fetches data!
    const {
      data = [],
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error
    } = useGetItemsQuery(searchTerm)

    // console.log('Cocktails rerender')

    const items = (isSuccess && data['drinks'] instanceof Array) ? data['drinks'] : []

    let render = ''
    if (searchTerm.length === 0) {
      render = ''
    }
    else if (isLoading || isFetching) {
      render = <p className='message'>LOADING</p>
    } else if (isError) {
      <p className='message'>Error: {error}</p>
    } else if (!isLoading && !isFetching && isSuccess) {
      if (items.length > 0) {
        render = <>{createDrinksComps(items)}</>
      } else {
        render = <p className='message'>No match with that search term.</p>
      }
    } else {
      render = <p className='message'>NO DATA AVAILABLE!</p>
    }

  return (
    <section className='Cocktails'>
      {render}
    </section>
  )
}

export default Cocktails