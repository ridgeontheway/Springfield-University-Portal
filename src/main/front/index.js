import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import App from './modules/App'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
)
