import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const CartOps = () => {

    const storeUrl = useStoreState((state) => state.url);
    const storeUrlReset = useStoreState((state) => state.urlReset);
    const storeApiFetchCb = useStoreState((state) => state.apiFetchCb)
    const storeAPIError = useStoreState((state) => state.APIError);

    const storeReset = useStoreActions((actions) => actions.reset);

    const resetItems = useCallback(async() => {
        await storeReset({url:storeUrl, urlReset:storeUrlReset})
        if (storeAPIError) {
            return
        }

        storeApiFetchCb()
    }, [storeAPIError, storeReset, storeApiFetchCb])

  return (
    <section>
        <button onClick={storeApiFetchCb}>REFETCH</button>
        <button onClick={resetItems}>RESET</button>
    </section>
  )
}

export default CartOps