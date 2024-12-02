import React from 'react'
import {useStoreState} from 'easy-peasy'

const CartTotal = () => {
    
    const getTotalPrice = useStoreState((state) => state.products.getTotalPrice);

  return (
    <section className='cartTotal'>
        <div className="cartTotal__div"></div>
        <div className="cartTotal__div_price">{getTotalPrice}</div>
    </section>
    
  )
}

export default CartTotal