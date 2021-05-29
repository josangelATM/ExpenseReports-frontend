import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/reducers';
import axios from 'axios'

axios.defaults.baseURL= process.env.REACT_APP_API_URL;

const store =  process.env.NODE_ENV === 'production' ? createStore(rootReducer) : createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const app = <React.StrictMode>
            <Provider store={store}>
              <App />
            </Provider>
            </React.StrictMode>



ReactDOM.render(app,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
