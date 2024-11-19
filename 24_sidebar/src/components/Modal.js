import React from 'react'
import { useDataContext } from '../Context/DataContext'

const Modal = () => {

    const {modalOpen, handleToggleModal} = useDataContext();

    const ModalClass = 'Modal_overlay' + (modalOpen ? ' show_modal' : '');

  return (
    <section className={ModalClass}>
        <section className="Modal__section ModalContainer">
            <div className="ModalContainer__div close">
                <button className="close__btn cursor_pointer" onClick={() => {return handleToggleModal('close')}}>
                    <div className="close__btn-icon"></div>
                </button>
            </div>
            <h1 className="ModalContainer__h1">A breeze cannot lead a man if he stays within his walls.</h1>
        </section>
    </section>
  )
}

export default Modal