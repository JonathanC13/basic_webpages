import React from 'react'
import './ItemsList.css'
import LineItem from './LineItem'

const ItemsList = ( {objects = []} ) => {
    let lineItems = [];
    for (let i = 0; i < objects.length; i++) {
        lineItems.push(<LineItem key={objects[i].id} object={JSON.stringify(objects[i])} />);
    }

  return (
    <ul className='lineItem__ul'>
        {lineItems}
    </ul>
  )
}

export default ItemsList