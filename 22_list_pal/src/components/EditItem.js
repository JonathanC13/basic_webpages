import React from 'react'
import DataContext from '../Context/DataContext'
import {useContext, useState, useEffect} from 'react'
import { format } from 'date-fns';
import ItemClass from '../template/dataTemplate'

const EditItem = ( {id, handleChangeEditId} ) => {

    const { listItems, setListItems } = useContext(DataContext)
    const [editItem, setEditItem] = useState('')

    const item = listItems.find((item) => {return item.id === id})

    const handleSaveEditItem = (id) => {
        if (item) {
            const datetime = format(new Date(Date.now()), 'MMMM dd, yyyy hh:mm:ss a')

            const editedItem = new ItemClass(item.id, item.checked, editItem, datetime)

            const newList = listItems.map((item) => {
                return (item.id === id) ? editedItem : item
            })

            setListItems(newList)

            handleChangeEditId(0)
        }
    }

    // if item exists, set the edit input value
    useEffect(() => {
        if (item) {
            setEditItem(item['desc'])
        }
    }, [item, setEditItem])

  return (
    <section>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <label htmlFor="editItem" className='offscreen'>Edit item</label>
            <input 
                type="text"
                value={editItem}
                onChange={(e) => {setEditItem(e.target.value)}}
                />
            <button type='submit' onClick={(e) => {handleSaveEditItem(item.id)}}>Save</button>
            <button type='submit' onClick={(e) => {handleChangeEditId(0)}}>Cancel</button>
        </form>
    </section>
  )
}

export default EditItem