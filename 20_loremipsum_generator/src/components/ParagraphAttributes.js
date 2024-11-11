import React from 'react'

const createSelOpt = (options) => {
  let comps = []
  //console.log(options)
  options.forEach((opt, idx) => {
    comps.push(
      <option key={idx} value={opt}>{opt}</option>
    )
  })

  return comps
}

const ParagraphAttributes = ({paragraphs={}, paraNum=1, setParaNum=()=>{}, paraLen='short', setParaLen=()=>{}, changeParaAttrHandler=()=>{}}) => {
  
  let paraLengths = []
  for (let itm in paragraphs) {
    paraLengths.push(itm)
  }

  const min = paragraphs !== undefined && paragraphs[paraLen] !== undefined && paragraphs[paraLen].length > 0 ? 1 : 0;
  const max = paragraphs !== undefined && paragraphs[paraLen] !== undefined ? paragraphs[paraLen].length : 0

  return (
    <form className='paragrapAttributes' id='paragraphAttributes' onSubmit={(e) => {e.preventDefault()}}>
        <div className='paragraphNum'>
          <label htmlFor='paragraphNum' className="paragraphNum__label">Paragraphs</label>
          <input id='paragraphNum' name='paragraphNum' type='number' 
            form='paragraphAttributes'
            min={min}
            max={max}
            value={paraNum} // the current state of the input
            onChange={(e) => setParaNum(e.target.value)} // update the state as input is changed.
          ></input>
        </div>
        <div className='paragraphLength'>
          <label htmlFor='paragraphLength' className='paragraphLength'>Length</label>
          <select id="paragraphLength" name="paragraphLength" form='paragraphAttributes'
            value={paraLen} // the current state of the input
            onChange={(e) => {
              setParaLen(e.target.value)
              if (paragraphs[e.target.value].length < max) {
                setParaNum(paragraphs[e.target.value].length)
              }
            }} // update the state as input is changed.
            >
            {createSelOpt(paraLengths)}
          </select>
        </div>
        <button type='submit' onClick={changeParaAttrHandler}>Submit</button>
    </form>
  )
}

export default ParagraphAttributes