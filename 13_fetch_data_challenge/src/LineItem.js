import React from 'react'
import './LineItem.css'

const LineItem = ( { object = {} } ) => {
  return (
    <li className='item'>
        {object}
    </li>
  )
}

export default LineItem