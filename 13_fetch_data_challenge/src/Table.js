import React from 'react'
import './Table.css'
import Row from './Row'

const Table = ( {objects = []} ) => {
  return (
    <div className='Table_container'>
        <table>
            <tbody>
                {objects.map((object) => (
                    <Row
                        key={object.id}
                        object={object}
                    >
                    </Row>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table