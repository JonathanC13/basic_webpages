import React from 'react'
import { useStoreState } from 'easy-peasy'
import Item from './Item'

const createItemComps = (data) => {
    if (data.length === 0) {
        return []
    }
    
    const comps = data.map((itm, i) => {
        return <Item 
            key={itm['id']}
            id={itm['id']}
        ></Item>
    })

    return comps
}

const CartItems = () => {

    const storeItems = useStoreState((state) => state.items)

  return (
    <>
        {storeItems.length === 0 && <p className='empty_cart'>Empty cart</p>}
        <ul className='cartItems'>
            {createItemComps(storeItems)}
        </ul>
    </>
    
  )
}

export default CartItems