import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import { useDataContext, DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Navbar></Navbar>
        <SideNav></SideNav>
        <Body></Body>
      </DataProvider>
    </div>
  );
}

export default App;
