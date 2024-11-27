import React from 'react'
import {useDataContext} from '../context/DataContext'

const Comp1 = () => {

    const { state1 } = useDataContext()
    console.log('Comp1 render')

  return (
    <div>
        <p>{state1}</p>
        
    </div>
  )
}

export default Comp1