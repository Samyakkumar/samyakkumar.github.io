import React from 'react';
import logo from './logo.svg';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
