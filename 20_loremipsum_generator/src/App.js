import './App.css';
import Header from './components/Header'
import ParagraphAttributes from './components/ParagraphAttributes';
import {useState, useEffect} from 'react'
import useAPIFetch from './hooks/useApiFetch';
import Content from './components/Content';

function App() {
  //const url = 'http://localhost:3500/lorem'
  const [url,setUrl] = useState('http://localhost:3500/lorem')  // don't need state since we query once and get all the total info and don't need to refetch
  //const [url, setURL] = useState('https://loripsum.net/api') // make the url a state so that it will trigger rerender for the useAPIFetch custom hook. Needed because we query specific info // understandable CORS block
  const [paragraphs, setParagraphs] = useState({})  // all the data from the api
  // form
  const [paraNum, setParaNum] = useState(1)
  const [paraLen, setParaLen] = useState('short')
  //filter
  const [numFilter, setNumFilter] = useState(1)
  const [lenFilter, setLenFilter] = useState('short')
  // custom hook. If the URL remains the same, the api within is not called.
  const {data, isLoading, APIErr} = useAPIFetch(url)

  // on load, first fetch
  useEffect(() => {
    setParagraphs(data);
  }, [data, setParagraphs])

  // to get filter the content
  const getFilteredContent = () => {
    if (paragraphs[lenFilter] !== undefined) {
      return paragraphs[lenFilter].slice(0, numFilter)
    } else {
      return []
    }
  }

  const changeParaAttrHandler = () => {
    // form. Since states already updated because they are controlled inputs, just need to build url and change the url state; 1. this will trigger this component to re-render, 2. useAPIFetch will call with a potentially different url from previously, 3. If the data returned from the custom hook is different, then setParagraphs is called

    // validate form and then like checking type and range, because the elements in the HTML can be edited.
    let num = paraNum
    if (paraNum <= 0) {
      if (paragraphs[paraLen].length > 0) {
        num = 1
      } else {
        num = 0
      }
    } else if (paraNum > paragraphs[paraLen].length) {
      num = paragraphs[paraLen].length
    }

    // set url to trigger this component to re-render and the custom hook to fetch new data
    // setUrl('http://localhost:3500/lorem2')
    //setURL(`https://loripsum.net/api/${paraNum}/${paraLen}`);

    
    // since do not want Content component to change content when the states like paraNum and paraLen change, we have another state, content, to have the specific content and only changes when the submit is clicked.
    // remember that the operations in the same render will operate on the current state, by using a variable we store the same value to setParaNum and setContent
    setParaNum(num)

    // change the filter so that it triggers the filtering of the content!
    setNumFilter(num)
    setLenFilter(paraLen)
  }

  return (
    <div className="App">
      <Header title='Lorem Ipsum Genny'/>
      <ParagraphAttributes
        paragraphs={paragraphs}
        paraNum={paraNum}
        setParaNum={setParaNum}
        paraLen={paraLen}
        setParaLen={setParaLen}
        changeParaAttrHandler={changeParaAttrHandler}
      />
      {isLoading && <p>Loading!</p>}
      {APIErr && <p>Error: {APIErr}</p>}
      {!isLoading && !APIErr && 
        <Content content={getFilteredContent() || []}/>
      }
    </div>
  );
}

export default App;
