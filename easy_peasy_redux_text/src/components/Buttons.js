import React from 'react'
import {useStoreActions} from 'easy-peasy'

const Buttons = () => {

    const handleState1 = useStoreActions(actions => actions.addState1);
    const handleState2 = useStoreActions(actions => actions.addState2);
    console.log('Button render')

  return (
    <>
        <button onClick={() => {handleState1(1)}}>state1</button>
        <button onClick={() => {handleState2(2)}}>state2</button>
    </>
  )
}

export default Buttons