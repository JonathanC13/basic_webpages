import React from 'react'
import Button from './Buttons'

const extractCategories = (menuInfo, categories) => {
  for (let prop in menuInfo) {
    categories.push(prop.slice(0,1).toUpperCase() + prop.slice(1))
  }
}

const createButtons = (categories=[], categorySelected, handleCatSelected) => {
    let components = []
    for (let category of categories) {
        components.push(
          <Button 
            key={category}
            value={category}
            categorySelected={categorySelected}
            handleCatSelected={handleCatSelected}
          />
        )
    }

    return components
} 

const Categories = ({menuInfo = {}, categorySelected = '', handleCatSelected=()=>{}}) => {

   const categories = ['All']
   extractCategories(menuInfo, categories)
    // remember that {createNavComponents(categories)} in the jsx will extract the components from the array
  return (
    <form className='categories' onSubmit={(e) => {e.preventDefault()}}>
        {createButtons(categories, categorySelected, handleCatSelected)}
    </form>
  )
}

export default Categories