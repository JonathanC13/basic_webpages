import React from 'react'
import EditItem from './EditItem'
import DataContext from '../Context/DataContext'
import {useContext} from 'react'
import {FaPenToSquare, FaTrashCan} from 'react-icons/fa6'
import { format } from 'date-fns';
import ItemClass from '../template/dataTemplate'

const Item = ({id, editId, handleChangeEditId}) => {

    const { listItems, setListItems } = useContext(DataContext)

    const item = listItems.find((item) => {return item.id === id})

    const handleCheckItem = (id) => {
      const datetime = format(new Date(Date.now()), 'MMMM dd, yyyy hh:mm:ss a')

      const editedItem = new ItemClass(item.id, !item.checked, item.desc, datetime)

      const newList = listItems.map((item) => {
          return (item.id === id) ? editedItem : item
      })

      setListItems(newList)
    }

    const handleDeleteitem = (id) => {
      const newList = listItems.filter((item) => {
        return (item.id !== id)
      })

      setListItems(newList)
    }

    const itemDescClass = 'Item__p' + (item['checked'] ? ' striked' : '')
    
  return (
    <>
        {id === editId && <EditItem
            id={id}
            handleChangeEditId={handleChangeEditId}
        ></EditItem>}
        {id !== editId &&
        <section className='Item'>
            <input className='Item__checkbox cursor_pointer' type="checkbox" id="itemCheck" name="itemCheck" value="checked" checked={item['checked']} onChange={() => {handleCheckItem(item['id'])}}/>
            <label htmlFor="itemCheck" className='offscreen'>{item['desc']}</label>
            <p className={itemDescClass}>{item['desc']}</p>
            <FaPenToSquare className='Item__edit cursor_pointer' type='button' onClick={() => {handleChangeEditId(item['id'])}}></FaPenToSquare>
            <FaTrashCan className='Item__delete cursor_pointer' type='button' onClick={() => {handleDeleteitem(item['id'])}}></FaTrashCan>
        </section>
        }
    </>
  )
}

export default Item