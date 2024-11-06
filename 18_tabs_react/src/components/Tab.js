import React from 'react'

const Tab = ( {id='', company='', tabSelected='', handleTabChange} ) => {

    const classes = 'tab cursor_pointer' + (id === tabSelected) ? (' tab_selected') : ('')

  return (
    <button 
        className={classes}
        id={id}
        onClick={(e) => {handleTabChange(e.target.id)}}
    >{company}
    </button>
  )
}

export default Tab