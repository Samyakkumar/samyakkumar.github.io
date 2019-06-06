import React from 'react';
import logo from './logo.svg';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import ReactGA from 'react-ga';

function initializeReactGA() {
  ReactGA.initialize('UA-141601792-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function App() {
  initializeReactGA();
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
