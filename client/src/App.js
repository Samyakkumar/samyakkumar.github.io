import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import Home from "./components/Home/Home";
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
    <Route exact path="/">
        <Home />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </div>
    </Router>
  );
}

export default App;
