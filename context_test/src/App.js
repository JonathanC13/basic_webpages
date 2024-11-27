import logo from './logo.svg';
import './App.css';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Buttons from './components/Buttons';

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

export default App;

/*
With this setup:
1. where DataContext uses the {children} prop so when DataContext re-renders it will not also re-render it's children, ie. App, then Comp1 Comp2
  <DataContext.Provider
        value = {{
            state1, setState1, handleState1,
            state2, setState2, handleState2
        }}
    >
            {children}
    </DataContext.Provider>

2. React will find all components that contain useContext(counterContext) and render them. This includes if a function re-renders
  Expected:
    1. App not rerendered
    2. All subscribers to useContext, regardless of what specific thing subscribed to, that component will re-render
*/
