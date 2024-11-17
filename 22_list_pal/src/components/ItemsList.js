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

    const {listItems} = useContext(DataContext)
    const [editId, setEditId] = useState(false)

    const handleChangeEditId = (id) => {
        setEditId(id)
    }

  return (
    <section>
        {createItemComps(listItems, editId, handleChangeEditId)}
    </section>
  )
}

export default ItemsList