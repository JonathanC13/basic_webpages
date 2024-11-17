import React from 'react'
import DataContext from '../Context/DataContext'
import {useContext, useState, useEffect} from 'react'
import { format } from 'date-fns';
import ItemClass from '../template/dataTemplate';
import {FaCheck, FaXmark} from 'react-icons/fa6'

const EditItem = ( {id, handleChangeEditId} ) => {

    const { listItems, setListItems } = useContext(DataContext)
    const [editItem, setEditItem] = useState('')
    const [invalidInput, setInvalidInput] = useState(false)

    const item = listItems.find((item) => {return item.id === id})

    const handleSaveEditItem = (id) => {
        if (editItem.length === 0) {
            setInvalidInput(true)
        } else {
            setInvalidInput(false)
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
    }

    // if item exists, set the edit input value for the controlled input
    useEffect(() => {
        if (item) {
            setEditItem(item['desc'])
        }
    }, [item, setEditItem])

    const inputCSSClass = 'editItem__input' + (invalidInput ? ' invalid': '')

  return (
    <section className='EditItem'>
        <form className='EditItem__form editForm' onSubmit={(e) => {e.preventDefault()}}>
            <label htmlFor="editItem" className='editForm__label offscreen'>Edit item</label>
            <input 
                className={inputCSSClass}
                type="text"
                value={editItem}
                onChange={(e) => {setEditItem(e.target.value)}}
                />
            <button className='editItem__save cursor_pointer' type='submit' onClick={(e) => {handleSaveEditItem(item['id'])}}>
                <FaCheck className='editItem__save_icon'></FaCheck>
            </button>
            <button className='editItem__cancel cursor_pointer' type='submit' onClick={(e) => {handleChangeEditId(0)}}>
                <FaXmark className='editItem__cancel_icon'></FaXmark>
            </button>
            {/* <FaCheck className='editItem__save cursor_pointer' type='submit' onClick={(e) => {handleSaveEditItem(item['id'])}}></FaCheck>
            <FaXmark className='editItem__cancel cursor_pointer' type='button' onClick={(e) => {handleChangeEditId(0)}}></FaXmark> */}
        </form>
    </section>
  )
}

export default EditItem