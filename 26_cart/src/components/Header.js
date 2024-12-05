import React from 'react'
import {FaCartShopping} from 'react-icons/fa6'
import { useStoreState } from 'easy-peasy'

const Header = () => {

  const totalQuant = useStoreState((state) => state.getTotalQuant)

  return (
    <header className='header'>
      <section className="header__section">
        <img className='header__img' src="./images/logoipsum-311.svg" alt="logo" />
        <div className='header__div cart_img'>
            <div className='cart_img__div numItems'>{totalQuant}</div>
            <FaCartShopping className='cart_img__svg'></FaCartShopping>
        </div>
      </section>
    </header>
  )
}

export default Header