import React from 'react'

const Title = ( {title=''} ) => {
  return (
    <header className='title'>
        <h1 className='title__h1'>{title}</h1>
    </header>
  )
}

export default Title