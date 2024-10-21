import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import Header from './Header';
import ColorDisplay from './ColorDisplay';
import ColorNameForm from './ColorNameForm';


function App() {

  const [color, setColor] = useState('')

  return (
    <div className="App">
      <div className="body">
        <Header 
          title="Color Preview"
        />
        <main className="main">
          <ColorDisplay
            color={color}
          />
          <ColorNameForm
            color={color}
            setColor={setColor}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
