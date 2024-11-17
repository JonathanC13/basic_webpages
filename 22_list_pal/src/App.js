import './App.css';
import { DataProvider } from './Context/DataContext';
import AddItem from './components/AddItem';
import ItemsList from './components/ItemsList';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <section className="ListContainer">
          <AddItem 
            title='List pal'
          />
          <ItemsList />
        </section>
      </DataProvider>
    </div>
  );
}

export default App;
