import './App.css';
import { DataProvider } from './Context/DataContext'
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Home></Home>
        <Sidebar></Sidebar>
        <Modal></Modal>
      </DataProvider>
    </div>
  );
}

export default App;
