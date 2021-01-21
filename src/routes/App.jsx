import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.scss';
import Home from '../containers/App';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
