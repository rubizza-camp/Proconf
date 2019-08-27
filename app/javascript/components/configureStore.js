import { createStore } from 'redux';

const initialState = {
  episodes: [
    {
      id: '1',
      title: 'First title'
    },
    {
      id: '2',
      title: 'Second title'
    }
  ]
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