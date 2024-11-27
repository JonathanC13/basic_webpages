import {createStore, action, thunk, computed} from 'easy-peasy';

const store = createStore({
    
    // store states. states: init value
    state1: 0,
    state2: 0,
    // store actions.
    addState1: action((state, payload) => {
        state.state1 += payload;
    }),
    addState2: action((state, payload) => {
        state.state2 += payload;
    })
});

export default store
