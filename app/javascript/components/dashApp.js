import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import configureStore from './configureStore'

const store = configureStore();

class dashApp extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <App authenticity_token={this.props.authenticity_token}/>
        </Router>
      </Provider>
    );
  }
}

export default dashApp
