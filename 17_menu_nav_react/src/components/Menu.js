import React from 'react'
import Item from './Item'

const createItemComponents = (categorySelected, menuInfo, all=false) => {
    let components = []
    let categoryMenu = []

    if (all) {
        for (let cate in menuInfo) {    // gets keys
            for (let item of menuInfo[cate]) {  // for each array in the value of the key
                categoryMenu.push(item)
            }
        }
    } else {
        categoryMenu = [...menuInfo[categorySelected]]
    }
    
    for (let item of categoryMenu) {
        components.push(
            <Item
                key={item['id']}
                id={item['id']}
                item={item}
            />
        )
    }

    return components
}

const Menu = ( {categorySelected='', menuInfo={}} ) => {

  return (
    <main className='menu_main'>
        {createItemComponents(categorySelected, menuInfo, categorySelected==='All')}
    </main>
  )
}

export default Menu