import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import configureStore from './configureStore'
import axios from 'axios';

const store = configureStore();

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
if (localStorage.getItem('currentUser') != null){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
}

class dashApp extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default dashApp
