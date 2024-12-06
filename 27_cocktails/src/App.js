import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home'
import About from './components/About'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route 
            exact path="/" 
            element={
              <Home></Home>
            }
        />
        <Route 
            exact path="/about" 
            element={
              <About></About>
            }
        />
      </Routes>
    </div>
  );
}

export default App;
