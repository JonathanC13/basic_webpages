import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useState } from 'react'

const Question = ( {questions, id} ) => {

    const [showAns, setShowAns] = useState(false);

    const question = questions.find((q) => ((q.id).toString() === id))

    const handleToggleAns = () => {
        setShowAns(!showAns)
    }

  return (
    <article className='Question'>
        <div className="Question_bar">
            <h3 className='Question_bar__p'>{question.question}</h3>
            <div className='FaIcon__div'>
                {!showAns ? (
                    <FaPlus className='FaIcon cursor_pointer' onClick={handleToggleAns}></FaPlus>
                ) : (
                    <FaMinus className='FaIcon cursor_pointer' onClick={handleToggleAns}></FaMinus>
                )}    
            </div>
        </div>
        {showAns && <p className='Question_ans'>{question.answer}</p>}
    </article>
  )
}

export default Question