import React from 'react'
import { useContext, useState } from 'react'
import DataContext from '../Context/DataContext';
import Item from './Item';

const createItemComps = (listItems, editId, handleChangeEditId) => {

    let comps = []

    listItems.forEach((item) => {
        comps.push(
            <Item
                key={item.id}
                id={item.id}
                editId={editId}
                handleChangeEditId={handleChangeEditId}
            />
        )
    })

    return comps
}

const ItemsList = () => {

    const {listItems, setListItems} = useContext(DataContext)
    const [editId, setEditId] = useState(false) // brought state up so that only one item is edited at a time

    const handleChangeEditId = (id) => {
        setEditId(id)
    }
    
    const handleClearAllItems = () => {
        setListItems([])
    }

  return (
    <section className='ItemsList'>
        {createItemComps(listItems, editId, handleChangeEditId)}
        {listItems.length > 0 &&
        <button className='clearItems cursor_pointer' onClick={handleClearAllItems}>
            Clear all items
        </button>
        }
    </section>
  )
}

export default ItemsList