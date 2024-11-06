import React from 'react'
import Tab from './Tab'

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
    <section className='tabs'>
        {createTabComponents(jobs, tabSelected, handleTabChange)}
    </section>
  )
}

export default Tabs