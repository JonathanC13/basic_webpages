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

    const inputCSSClass = 'itemForm__input' + (invalidInput ? ' invalid': '')

  return (
    <section className='AddItem'>
        <h1 className='AddItem__h1'>{title}</h1>
        <form className='AddItem__form addForm' onSubmit={(e) => {e.preventDefault()}}>
            <label htmlFor="addItem" className='itemForm__label offscreen'>Add item</label>
            <input 
                className={inputCSSClass}
                type="text" 
                placeholder='e.g. Mazda Miata'
                value={addItemDesc}
                onChange={(e) => {setAddItemDesc(e.target.value)}}
            />
            <button className='itemForm__button cursor_pointer' type='submit' onClick={handleAddItem}>
                <span className='itemForm__button__span'>Submit</span>
            </button>
        </form>
    </section>
  )
}

export default AddItem