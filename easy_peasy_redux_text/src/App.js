import logo from './logo.svg';
import './App.css';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Buttons from './components/Buttons';

// npm install easy-peasy

function App() {

  console.log('App render')
  return (
    <div className="App">
      <Comp1></Comp1>
      <Comp2></Comp2>
      <Buttons></Buttons>
    </div>
  );
}

/*

With this setup with easy-peasy redux. The component only rerenders IF the store state it is using changes. Unlike Context where if anything inside Context changes all subscribers, regardless of what they are subscribed to, will re-render.

*/

export default App;
