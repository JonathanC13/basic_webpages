import React from 'react'
import { FaComment } from 'react-icons/fa'

const Header = ({title}) => {
  return (
    <header className='title'>
      <FaComment className='faComment'/>
       <h1 className='title__h1'>{title}</h1>
    </header>
  )
}

export default Header