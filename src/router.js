import React, {Component} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import App from './components/app/app';

 class Router extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={App}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
