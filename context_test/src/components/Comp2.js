import React from 'react'
import {useDataContext} from '../context/DataContext'

const Comp2 = () => {

    const { state2 } = useDataContext()
    console.log('Comp2 render')

  return (
    <div>
        <p>{state2}</p>
        
    </div>
  )
}

export default Comp2