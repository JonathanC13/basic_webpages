import React from 'react'
import Tab from './Tab'
import { FaArrowDownWideShort } from 'react-icons/fa6'

const createTabComponents = (jobs, tabSelected, handleTabChange) => {
    let components = []

    jobs.toReversed().forEach((job, idx) => {
        components.push(
            <Tab
                key={job.id}
                id={job.id}
                company={job.company}
                tabSelected={tabSelected}
                handleTabChange={handleTabChange}
            ></Tab>
        )
    })

    return components
}

const Tabs = ( {jobs=[], tabSelected='', handleTabChange=()=>{}} ) => {

  return (
    <div className='cursor_pointer company_menu'>
        <div className='companies'>Companies <FaArrowDownWideShort/></div>
        <section className='tabs'>
            {createTabComponents(jobs, tabSelected, handleTabChange)}
        </section>
    </div>
  )
}

export default Tabs