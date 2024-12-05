import './App.css';
import {useStoreState, useStoreActions} from 'easy-peasy'
import { useEffect } from 'react';
// import useTestHook from './hooks/useTestHook'
import useApiFetch from './hooks/useApiFetch'
import Header from './components/Header';
import Cart from './components/Cart';

// const printTitles = (data) => {
//   // https://github.com/typicode/json-server#routes
//   // **Needed to alter the data in db.json since PUT needs an id or else I would have to update individually
//    // carts : {
//    //  [
//    //    id: "1",
//    //    items: [
//    //      ...
//    //    ]
//    //  ]
//    }
  
//   if (data.length !== 1) {
//     return
//   }
  
//   const comps = data[0]['items'].map((itm, i) => {
//     return <p key={i}>{itm['title']}</p>
//   })
//   return comps
// }

function App() {

  const storeUrl = useStoreState((state) => state.url);
  // const storeItems = useStoreState((state) => state.items);
  const storeIsLoading = useStoreState((state) => state.isLoading);
  const storeAPIError = useStoreState((state) => state.APIError);

  const storeSetItems = useStoreActions((actions) => actions.setItems);
  const storeSetIsLoading = useStoreActions((actions) => actions.setIsLoading);
  const storeSetAPIError = useStoreActions((state) => state.setAPIError);
  const storeSetApiFetchCb = useStoreActions((actions) => actions.setApiFetchCb);

  const {data, isLoading, APIError, APIFetchCb} = useApiFetch(storeUrl)

  useEffect(() => {
    if (data.length === 0) {
      return
    }
    data.sort((a, b) => {return a['id'] - b['id']})
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
      <Header></Header>
      {storeAPIError && <p>{storeAPIError}</p>}
      {storeIsLoading && <p className='loading'>LOADING...</p>}
      {!storeAPIError && !isLoading &&
        <>
          <Cart></Cart>
        </>
      }

    </div>
  );
}

export default App;
