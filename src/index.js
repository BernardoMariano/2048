import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'

import BoardContainer from './containers'
import reducers from './reducers'
import './index.css'

const logger = createLogger()
const store = createStore(
  reducers,
  applyMiddleware(logger)
)

render(
  <Provider store={ store }>
    <BoardContainer />
  </Provider>,
  document.getElementById('root')
);
