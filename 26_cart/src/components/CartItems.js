import React from 'react'
import { useStoreState } from 'easy-peasy'
import Item from './Item'

const createItemComps = (data) => {
    // https://github.com/typicode/json-server#routes
    // **Needed to alter the data in db.json since PUT needs an id or else I would have to update individually

    if (data.length !== 1) {
        return []
    }

    const comps = data[0]['items'].map((itm, i) => {
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
    <ul className='cartItems'>
        {createItemComps(storeItems)}
    </ul>
  )
}

export default CartItems