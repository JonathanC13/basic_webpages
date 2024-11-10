import React from 'react'

const createPara = (content) => {
    let comps = []

    content.forEach((itm, idx) => {
        comps.push(
            <p key={idx}>{itm}</p>
        )
    })

    return comps
}

const Content = ({content}) => {
  return (
    <section>
        {createPara(content)}
    </section>
  )
}

export default Content