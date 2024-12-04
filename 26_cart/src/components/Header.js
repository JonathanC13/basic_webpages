import React from 'react'
import {FaCartShopping} from 'react-icons/fa6'

const Header = () => {
  return (
    <header className='header'>
      <section className="header__section">
        <img className='header__img' src="./images/logoipsum-311.svg" alt="logo" />
        <div className='header__div cart_img'>
            <div className='cart_img__div numItems'>0</div>
            <FaCartShopping className='cart_img__svg'></FaCartShopping>
        </div>
      </section>
    </header>
  )
}

export default Header