import React from 'react'
import EditItem from './EditItem'
import DataContext from '../Context/DataContext'
import {useContext} from 'react'

const Item = ({id, editId, handleChangeEditId}) => {

    const { listItems } = useContext(DataContext)

    const item = listItems.find((item) => {return item.id === id})
    
  return (
    <>
        {id === editId && <EditItem
            id={id}
            handleChangeEditId={handleChangeEditId}
        ></EditItem>}
        {id !== editId &&
        <section>
            <p>{item['desc']}</p>
            <button type='button' onClick={() => {handleChangeEditId(id)}}></button>
        </section>
        }
    </>
  )
}

export default Item