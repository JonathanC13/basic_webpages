import React from 'react'

const Buttons = ( {value='', categorySelected='', handleCatSelected=()=>{}}) => {

    const classname = 'category__btn cursor_pointer' + (value === categorySelected ? ' selected' : '')

  return (
    <button
        value={value}
        className={classname}
        onClick={(e) => handleCatSelected(e.target.value)}
    >{value.slice(0,1).toUpperCase() + value.slice(1)}</button>
  )
}

export default Buttons