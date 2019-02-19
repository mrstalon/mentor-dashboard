import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import store from '../store'

import MainPage from '../views/main-page'

function Router() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="*" component={MainPage} exact />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default Router
