import React from 'react'
import './Tabs.css';
import Button from './Button';

const Tabs = ({tabSelected = 'users', handleTabSelected = () => {}}) => {

  return (
    <form className='Tabs' onSubmit={(e) => {e.preventDefault()}}>
        <Button
          value='users'
          tabSelected={tabSelected}
          handleTabSelected={handleTabSelected}
        />
        <Button
          value='posts'
          tabSelected={tabSelected}
          handleTabSelected={handleTabSelected}
        />
        <Button
          value='comments'
          tabSelected={tabSelected}
          handleTabSelected={handleTabSelected}
        />
    </form>
  )
}

export default Tabs