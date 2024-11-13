import './App.css';
import Header from './components/Header';
import Colors from './components/Colors';
import Values from 'values.js'
import { useState, useEffect } from 'react'

function App() {

  const [colors, setColors] = useState([])
  const [colorStr, setColorStr] = useState('')  // for controlled input
  const [inputMessage, setInputMessage] = useState('')

  const changeColorHandler = () => {
    // with the input, change the state of colors with the new colors
    try {
      const colors = new Values(colorStr)
      setColors(colors.all(10))
      setInputMessage('')
    } catch (err) {
      setInputMessage(err.message)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header
          title='Color Generator'
          colorStr={colorStr}
          setColorStr={setColorStr}
          changeColorHandler={changeColorHandler}
          inputMessage={inputMessage}
        />
        <Colors 
          colors={colors}
        />
      </header>
    </div>
  );
}

export default App;
