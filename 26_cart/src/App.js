import './App.css';
import {useStoreState, useStoreActions} from 'easy-peasy'
import { useEffect } from 'react';
import useTestHook from './hooks/useTestHook'

function App() {

  const storeIsLoading = useStoreState((state) => state.isLoading);
  const storeItems = useStoreState((state) => state.items);
  const storeApiFetchCb = useStoreState((state) => state.apiFetchCb)
  const storeSetIsLoading = useStoreActions((actions) => actions.setIsLoading);
  const storeSetItems = useStoreActions((actions) => actions.setItems);
  const storeSetApiFetchCb = useStoreActions((actions) => actions.setApiFetchCb);

  const {isLoading, data, apiFetchCb} = useTestHook()

  useEffect(() => {
    storeSetIsLoading(isLoading)
  }, [isLoading, storeSetIsLoading])

  useEffect(() => {
    storeSetItems(data)
  }, [data, storeSetItems])

  useEffect(() => {
    storeSetApiFetchCb(apiFetchCb)
  }, [apiFetchCb, storeSetApiFetchCb])

  return (
    <div className="App">
      {storeIsLoading && <p>LOADING</p>}
      {!isLoading && 
        <>
        <p>{storeItems}</p>
        <button onClick={storeApiFetchCb}>REFETCH</button>
        </>
      }

    </div>
  );
}

export default App;
