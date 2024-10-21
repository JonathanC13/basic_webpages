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
        <Header 
          title="Color Preview"
        />
        <main className="main">
          <section className="colorPreview__section">
            <ColorDisplay
              color={color}
            />
            <ColorNameForm
              color={color}
              setColor={setColor}
            />
          </section>
        </main>
    </div>
  );
}

export default App;
