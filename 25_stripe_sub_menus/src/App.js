import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Submenu from './components/Submenu';
import SideNav from './components/SideNav';
import { useDataContext } from './context/DataContext';

function App() {

  const {sideNavOpen} = useDataContext()

  const appClasses = 'App ' + (sideNavOpen ? ' max_100vh':'')

  return (
    <div className={appClasses}>
      <Navbar></Navbar>
      <Submenu></Submenu>
      <SideNav></SideNav>
      <Body></Body>
    </div>
  );
}

export default App;
