import React from 'react'
import {useCallback} from 'react'
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
    }, [storeUrl, storeUrlReset, storeAPIError, storeReset])

  return (
    <section className='cartOps'>
        <button className='cartOps__btn_refetch cursor_pointer' onClick={storeApiFetchCb}>REFETCH</button>
        <button className='cartOps__btn_reset cursor_pointer' onClick={resetItems}>RESET</button>
    </section>
  )
}

export default CartOps