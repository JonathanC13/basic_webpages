import React from 'react'
import { FaComment } from 'react-icons/fa'

const Header = ({title}) => {
  return (
    <header className='title'>
        <h1 className='title__h1'><FaComment/> {title}</h1>
    </header>
  )
}

export default Header