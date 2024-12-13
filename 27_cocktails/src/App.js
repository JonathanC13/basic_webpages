import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home'
import About from './components/About'
import CocktailDetails from './components/CocktailDetails';
import Missing from './components/Missing';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <section className="BG__section">
        <section className="content__section">
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
            <Route
              exact path="/cocktail/:id"
              element={
                <CocktailDetails></CocktailDetails>
              }
            />
            <Route path="*" element={<Missing></Missing>} /> {/* path="*" like default */}
          </Routes>
        </section>
      </section>
    </div>
  );
}

export default App;
