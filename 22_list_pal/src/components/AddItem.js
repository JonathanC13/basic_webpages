import React from 'react'
import { useContext, useState } from 'react';
import DataContext from '../Context/DataContext';
import { format } from 'date-fns';
import ItemClass from '../template/dataTemplate';

const AddItem = ({title}) => {
    const {listItems, setListItems} = useContext(DataContext);

    const [addItemDesc, setAddItemDesc] = useState('')
    const [invalidInput, setInvalidInput] = useState(false)

    const handleAddItem = (e) => {
        if (addItemDesc.length === 0) {
            setInvalidInput(true)
        } else {
            setInvalidInput(false)
            const id = listItems.length ? listItems[listItems.length - 1].id + 1 : 1

            const datetime = format(new Date(Date.now()), 'MMMM dd, yyyy hh:mm:ss a')

            const newItem = new ItemClass(id, false, addItemDesc, datetime)

            const newItems = [...listItems, newItem]
            setListItems(newItems)

            setAddItemDesc('')
        }
    }

    const inputCSSClass = 'additem__input' + (invalidInput ? ' invalid': '')

  return (
    <section>
        <h1>{title}</h1>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <label htmlFor="addItem" className='offscreen'>Add item</label>
            <input 
                className={inputCSSClass}
                type="text" 
                placeholder='e.g. Mazda Miata'
                value={addItemDesc}
                onChange={(e) => {setAddItemDesc(e.target.value)}}
            />
            <button type='submit' onClick={handleAddItem}>Submit</button>
        </form>
    </section>
  )
}

export default AddItem