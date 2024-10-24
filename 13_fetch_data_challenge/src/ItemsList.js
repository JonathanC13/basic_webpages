import React from 'react'
import './ItemsList.css'
import LineItem from './LineItem'

const ItemsList = ( {objects = []} ) => {
    let lineItems = [];
    for (let i = 0; i < objects.length; i++) {
        lineItems.push(<LineItem key={objects[i].id} object={objects[i]} />);
    }

  // could have also used map
  /*
    return {
      <ul>
        {objects.map((object) => (
            <LineItem key={object.id} object={object} />
          )
        )}
      </ul>
    }
  */

  return (
    <ul className='lineItem__ul'>
        {lineItems}
    </ul>
  )
}

export default ItemsList