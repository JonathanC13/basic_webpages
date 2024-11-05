import React from 'react'

const Header = ({title=''}) => {
  return (
    <header className='header'>
        <h1 className='header__h1'>{title}</h1>
        <div className="header__div"></div>
    </header>
  )
}

export default Header