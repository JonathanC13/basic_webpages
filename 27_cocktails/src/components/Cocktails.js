import React from 'react'
import { useSelector } from 'react-redux'
import { useGetItemsQuery } from '../store/slices/api/apiSlice'
// import { setData } from '../store/slices/dataSlice/dataSlice'

const createDrinksComps = (items) => {
  if (items.length === 0) {
    return []
  }

  const comps = items.map((itm, idx) => {
    return <p key={itm['idDrink']}>{itm['strDrink']}</p>
  })
  
  return comps
}

const Cocktails = () => {

    const searchTerm = useSelector((state) => state.data.searchTerm)

    // Calling the `useGetPostsQuery()` hook automatically fetches data!
    const {
      data: data = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetItemsQuery(searchTerm)

    console.log('Cocktails rerender')

    const items = (isSuccess && data['drinks'] instanceof Array) ? data['drinks'] : []

  return (
    <section>
      {isLoading && <p>LOADING</p>}
      {(!isLoading && isSuccess && items.length > 0) ? (
        <>{createDrinksComps(items)}</>
      ) : (
        <p>NO DATA AVAILABLE!</p>
      )}
    </section>
  )
}

export default Cocktails