import React from 'react'
import { useState, useEffect } from 'react'
import useAPIFetch from './hooks/useAPIFetch'
import Question from './Question'

// component creation function outside of render function so that this function does not have to re-mounted each time it re-renders.
const questionComponentsList = (questions)=> {
    let compsList = []
    for (let i = 0; i < questions.length; i++) {
        compsList.push(
            <Question
                key={questions[i].id}
                questions={questions}
                id={questions[i].id}
            ></Question>
        )
    }
    return compsList
}

const Questions = () => {
    const url = 'http://localhost:3500/FAQ'

    const [questions, setQuestions] = useState([])
    const { data, isLoading, APIError } = useAPIFetch(url)

    useEffect(() => {
        setQuestions(data)
    }, [data, setQuestions])

  return (
    <section className='Questions'>
        {isLoading && <p>Questions are loading!</p>}
        {APIError && <p style={{color:'red'}}>{APIError}</p>}
        {!isLoading && !APIError &&
            questionComponentsList(questions)
        }
    </section>
  )
}

export default Questions