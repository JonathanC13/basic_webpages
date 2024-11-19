import React from 'react'
import { useDataContext } from '../Context/DataContext'

const Home = () => {

    const {sidebarOpen, handleToggleSidebar, modalOpen, handleToggleModal} = useDataContext();

    const hamburgerClasses = 'Hamburger' + (sidebarOpen ? ' visibility_none' : '')
    const modalClasses = 'OpenModal' + (modalOpen ? ' display_none' : '')

  return (
    <section className='Home'>
        <div className={hamburgerClasses}>
            <button className='hamburger__btn cursor_pointer' onClick={() => {return handleToggleSidebar('open')}}>
                <div className="hamburger__btn-icon"></div>
            </button>
        </div>
        <div className={modalClasses}>
            <button className="OpenModal__btn cursor_pointer" onClick={() => {return handleToggleModal('open')}}>
                SHOW MODAL
            </button>
        </div>
    </section>
  )
}

export default Home