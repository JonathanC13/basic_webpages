import React from 'react'
import './Header.css';

const Header = ( { title } ) => {
  return (
    <header className="header">
        <section className="header__section">
        <h1 className="header__h1">{title}</h1>
        </section>
    </header>
  )
}

export default Header