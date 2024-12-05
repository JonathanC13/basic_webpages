import React from 'react'
import {useStoreState} from 'easy-peasy'

const CartTotal = () => {
    
    const getTotalPrice = useStoreState((state) => state.getTotalPrice);

  return (
    <section className='cartTotal'>
        <div className="cartTotal__div"></div>
        <section className="cartTotal__section">
          <p className="cartTotal__section_p">Total</p>
          <p className="cartTotal__section_price">$ {getTotalPrice}</p>
        </section>
    </section>
    
  )
}

export default CartTotal