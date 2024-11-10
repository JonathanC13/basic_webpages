import './App.css';
import Header from './components/Header'
import ParagraphAmount from './components/ParagraphAttributes';
import {useState, useEffect} from 'react'
import useAPIFetch from './hooks/useApiFetch';
import Content from './components/Content';

function App() {
  const url = 'http://localhost:3500/lorem'
  //const [url,setUrl] = useState('http://localhost:3500/lorem')  // don't need state since we query once and get all the total info and don't need to refetch
  //const [url, setURL] = useState('https://loripsum.net/api') // make the url a state so that it will trigger rerender for the useAPIFetch custom hook. Needed because we query specific info // understandable CORS block
  const [paragraphs, setParagraphs] = useState({})  // all the data from the api
  const [content, setContent] = useState([]) // create a state for the specific content, so the Content component that uses this state will remain consistent and unchanged until the user submits
  const [paraNum, setParaNum] = useState(1)
  const [paraLen, setParaLen] = useState('short')
  // custom hook. If the URL remains the same, the api within is not called.
  const {data, isLoading, APIErr} = useAPIFetch(url)

  // on load, first fetch
  useEffect(() => {
    setParagraphs(data);
  }, [data])

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

    // set url
    //setUrl('http://localhost:3500/lorem')
    //setURL(`https://loripsum.net/api/${paraNum}/${paraLen}`);

    // since do not want Content component to change content when the states like paraNum and paraLen change, we have another state, content, to have the specific content and only changes when the submit is clicked.
    // remember that the operations in the same render will operate on the current state, by using a variable we store the same value to setParaNum and setContent
    setParaNum(num)
    setContent(paragraphs[paraLen].slice(0, num))
  }

  return (
    <div className="App">
      <Header title='Lorem Ipsum Genny'/>
      <ParagraphAmount
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
        <Content content={content}/>
      }
    </div>
  );
}

export default App;
