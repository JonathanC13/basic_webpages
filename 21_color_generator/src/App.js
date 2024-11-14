import './App.css';
import Header from './components/Header';
import Colors from './components/Colors';
import Values from 'values.js'
import { useState } from 'react'

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
      //setInputMessage(err.message)
      setInputMessage('Please enter a color string like #EE6C4D or rgb(255, 239, 213)')
    }
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
