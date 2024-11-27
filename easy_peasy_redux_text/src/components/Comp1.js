import React from 'react'
import {useStoreState} from 'easy-peasy'

const Comp1 = () => {

    const state1 = useStoreState((state) => state.state1)
    console.log('Comp1 render')

  return (
    <div>
        <p>{state1}</p>
        
    </div>
  )
}

export default Comp1