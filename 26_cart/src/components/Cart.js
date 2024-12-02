import React from 'react'
import CartItems from './CartItems'
import CartTotal from './CartTotal'
import CartOps from './CartOps'

const Cart = () => {
  return (
    <section className="cart">
        <h1 className='cart__h1'>Your Cart</h1>
        <CartItems></CartItems>
        <CartTotal></CartTotal>
        <CartOps></CartOps>
    </section>
  )
}

export default Cart