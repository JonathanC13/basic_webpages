import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Submenu from './components/Submenu';
import SideNav from './components/SideNav';
import { useDataContext, DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Navbar></Navbar>
        <Submenu></Submenu>
        <SideNav></SideNav>
        <Body></Body>
      </DataProvider>
    </div>
  );
}

export default App;
