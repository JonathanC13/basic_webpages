import './App.css';
import {useStoreState, useStoreActions} from 'easy-peasy'
import { useEffect } from 'react';
// import useTestHook from './hooks/useTestHook'
import useApiFetch from './hooks/useApiFetch'

const printTitles = (data) => {
  const comps = data.map((itm, i) => {
    return <p key={i}>{itm['title']}</p>
  })
  return comps
}

function App() {

  const url = 'http://localhost:3500/items'
  const urlReset = 'http://localhost:3500/items_original'

  const storeItems = useStoreState((state) => state.items);
  const storeIsLoading = useStoreState((state) => state.isLoading);
  const storeAPIError = useStoreState((state) => state.APIError);
  const storeApiFetchCb = useStoreState((state) => state.apiFetchCb)

  const storeSetItems = useStoreActions((actions) => actions.setItems);
  const storeSetIsLoading = useStoreActions((actions) => actions.setIsLoading);
  const storeSetAPIError = useStoreActions((state) => state.setAPIError);
  const storeSetApiFetchCb = useStoreActions((actions) => actions.setApiFetchCb);

  const {data, isLoading, APIError, APIFetchCb} = useApiFetch(url)

  useEffect(() => {
    storeSetItems(data)
  }, [data, storeSetItems])

  useEffect(() => {
    storeSetIsLoading(isLoading)
  }, [isLoading, storeSetIsLoading])

  useEffect(() => {
    storeSetAPIError(APIError)
  }, [APIError, storeSetAPIError])

  useEffect(() => {
    storeSetApiFetchCb(APIFetchCb)
  }, [APIFetchCb, storeSetApiFetchCb])

  return (
    <div className="App">
      {storeAPIError && <p>storeAPIError</p>}
      {storeIsLoading && <p>LOADING</p>}
      {!storeAPIError && !isLoading && 
        <>
        {printTitles(storeItems)}
        <button onClick={storeApiFetchCb}>REFETCH</button>
        </>
      }

    </div>
  );
}

export default App;
