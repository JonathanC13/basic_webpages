import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../store/slices/dataSlice/dataSlice'

const Cocktails = () => {

    const data = useSelector((state) => state.data.data)

    console.log('Cocktails rerender')

  return (
    <div>{data}</div>
  )
}

export default Cocktails