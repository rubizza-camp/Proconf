import { createStore } from 'redux';

const initialState = {
  episodes: []
}

function rootReducer(state, action) {
  console.log(action.type)
  switch (action.type) {
    default:
      return state
  }
}

export default function configureStore() {
  const store = createStore(rootReducer, initialState);
  return store;
}
