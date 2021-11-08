import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

//by wrapping the App component with the provider, each component inside App has access to the Store

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App /> 
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);