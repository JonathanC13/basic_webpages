import React from 'react'

const Header = ( {title} ) => {
  return (
    <header className='header'>
        <div className='header__div title'>
            <h1 className="title__h1">{title}</h1>
            <div className='title__div'></div>
        </div>
    </header>
  )
}

export default Header