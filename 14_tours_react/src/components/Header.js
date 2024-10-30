import React from 'react'
import '../css/Header.css'

const Header = ( { toursLen } ) => {

    const title = toursLen ? 'Our Tours' : 'No tours left!'

  return (
    <header className="header">
        <h1 className="header__h1">{title}
            <div className='header__h1__div'></div>
        </h1>
        
    </header>
  )
}

export default Header