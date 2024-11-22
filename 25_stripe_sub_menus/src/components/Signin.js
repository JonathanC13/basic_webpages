import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'

const Signin = () => {
  return (
    <div className="SideNav__sign-in sign-in">
        <button className="sign-in__btn cursor_pointer">Sign in <FaChevronRight></FaChevronRight></button>
    </div>
  )
}

export default Signin