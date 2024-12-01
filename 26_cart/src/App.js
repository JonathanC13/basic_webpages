import './App.css';
import {useStoreState, useStoreActions} from 'easy-peasy'
import { useEffect, useCallback } from 'react';
// import useTestHook from './hooks/useTestHook'
import useApiFetch from './hooks/useApiFetch'

const printTitles = (data) => {
  // https://github.com/typicode/json-server#routes
  // **Needed to alter the data in db.json since PUT needs an id or else I would have to update individually
  
  if (data.length !== 1) {
    return
  }
  
  const comps = data[0]['items'].map((itm, i) => {
    return <p key={i}>{itm['title']}</p>
  })
  return comps
}

function App() {

  const url = 'http://localhost:3500/carts'
  const urlReset = 'http://localhost:3500/items_original/1'

  const storeItems = useStoreState((state) => state.items);
  const storeIsLoading = useStoreState((state) => state.isLoading);
  const storeAPIError = useStoreState((state) => state.APIError);
  const storeApiFetchCb = useStoreState((state) => state.apiFetchCb)

  const storeSetItems = useStoreActions((actions) => actions.setItems);
  const storeSetIsLoading = useStoreActions((actions) => actions.setIsLoading);
  const storeSetAPIError = useStoreActions((state) => state.setAPIError);
  const storeSetApiFetchCb = useStoreActions((actions) => actions.setApiFetchCb);

  const storeReset = useStoreActions((actions) => actions.reset);

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

  const resetItems = useCallback(async() => {
    await storeReset({url:url, urlReset:urlReset})
    if (storeAPIError) {
      return
    }

    storeApiFetchCb()
  }, [storeAPIError, storeReset, storeApiFetchCb])

  return (
    <div className="App">
      {storeAPIError && <p>{storeAPIError}</p>}
      {storeIsLoading && <p>LOADING</p>}
      {!storeAPIError && !isLoading && 
        <>
        {printTitles(storeItems)}
        <button onClick={storeApiFetchCb}>REFETCH</button>
        <button onClick={resetItems}>RESET</button>
        </>
      }

    </div>
  );
}

export default App;
