import React from 'react'
import {useStoreState} from 'easy-peasy'

const Comp2 = () => {

    const state2 = useStoreState((state) => state.state2)
    console.log('Comp2 render')

  return (
    <div>
        <p>{state2}</p>
        
    </div>
  )
}

export default Comp2