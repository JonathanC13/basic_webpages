import React from 'react'
import {FaCartShopping} from 'react-icons/fa6'

const Header = () => {
  return (
    <header class='header'>
        <img class='header__img' src="./images/logoipsum-311.svg" alt="logo" />
        <div class='header__div cart_img'>
            <div class='cart_img__div numItems'>0</div>
            <FaCartShopping></FaCartShopping>
        </div>
    </header>
  )
}

export default Header