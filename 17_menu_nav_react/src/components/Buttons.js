import React from 'react'

const Buttons = ( {value='', categorySelected='', handleCatSelected=()=>{}}) => {

    const classname = 'category__btn' + (value === categorySelected ? ' selected' : '')

  return (
    <button
        value={value}
        className={classname}
        onClick={(e) => handleCatSelected(e.target.value)}
    >{value}</button>
  )
}

export default Buttons