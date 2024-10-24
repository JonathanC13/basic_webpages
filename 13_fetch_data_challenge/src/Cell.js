import React from 'react'
import './Cell.css'

const Cell = ( {value=''} ) => {
  return (
    <td className='a'>
        {value}
    </td>
  )
}

export default Cell