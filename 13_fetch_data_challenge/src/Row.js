import React from 'react'
import Cell from './Cell'
import './Row.css'

const Row = ( { object = {} }) => {
    
    let cellList = []
    // recursively flatten the object, DFS
    const flatten = (key, value) => {
        if (!(value instanceof Object && !Array.isArray(value))) {
            // If not a object, push to cellList
            cellList.push(
                <Cell
                    key={`${key}`}
                    value={JSON.stringify(value)}
                >
                </Cell>
            )
            return
        }
        
        // DFS
        Object.entries(value).map(([currkey, value]) => (
            // `${key}_${currkey}` so that no dup key for the Cell. parent_child
            flatten(`${key}_${currkey}`, value)
        ))
    }

    // first level
    Object.entries(object).map(([key, value]) => (
        flatten(key, value)
    ))

    // console.log(cellList[0])

  return (
    <tr>
        {/* {Object.entries(object).map(([key, value]) => (
            <Cell
                key={key}
                value={JSON.stringify(value)}
            >
            </Cell>
        ))} */}
        {cellList}
    </tr>
  )
}

export default Row