import React from 'react'
import './Tabs.css';

const Tabs = ({tabSelected = 'users', handleTabSelected = () => {}}) => {

  const styleButtonColor = (thisButtonId, tabSelected) => {

    let buttonColor = 'rgb(255, 235, 205)';
    if (thisButtonId === tabSelected) {
      buttonColor = 'rgba(255, 235, 205, 80%)';
    }

    return {
      backgroundColor: buttonColor
    }
  }

  return (
    <section className='Tabs'>
        <button 
          value='users' 
          type="button" 
          aria-label="change to users" 
          style={styleButtonColor('users', tabSelected)}
          onClick={(e) => {handleTabSelected(e.target.value)}}
          >
            users
          </button>
        <button value='posts' type="button" name="change to posts" style={styleButtonColor('posts', tabSelected)} onClick={(e) => {handleTabSelected(e.target.value)}}>posts</button>
        <button value='comments' type="button" name="change to comments" style={styleButtonColor('comments', tabSelected)} onClick={(e) => {handleTabSelected(e.target.value)}}>comments</button>
    </section>
  )
}

export default Tabs