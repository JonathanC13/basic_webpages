import React from 'react'
import Bullet from './Bullet'

const createBullets = (job) => {
    let bullets = []
    job['bullets'].forEach((bullet, idx) => (
        bullets.push(
            <Bullet
                key={idx}
                info={bullet}
            ></Bullet>
        )
    ))

    return bullets
}

const JobInfo = ( {jobs=[], tabSelected=''} ) => {
    
    const job = jobs.find((job) => (
        (job.id).toString() === (tabSelected).toString()
    ))

  return (
    <article className='article__job job'>
        <h2 className="job__h2">{job['role']}</h2>
        <h3 className="job__h3">{job.company}</h3>
        <h4 className="job__h4">{job.employed_range}</h4>
        {createBullets(job)}
    </article>
  )
}

export default JobInfo