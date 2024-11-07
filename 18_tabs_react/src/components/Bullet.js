import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const Bullet = ({ info='' }) => {
  return (
    <li><FaAngleDoubleRight className='fa_bullets'/> {info}</li>
  )
}

export default Bullet