import React from 'react'
import {useDataContext} from '../context/DataContext'

const Buttons = () => {

    const { handleState1, handleState2 } = useDataContext()
    console.log('Button render')

  return (
    <>
        <button onClick={handleState1}>state1</button>
        <button onClick={handleState2}>state2</button>
    </>
  )
}

export default Buttons