import React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../../components/Pages/Home/Home";
import Add from "../../components/Pages/Add/Add";
import Edit from "../../components/Pages/Edit/Edit";
import Stats from "../../components/Pages/Stats/Stats";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/edit" component={Edit} />
          <Route path="/stats" component={Stats} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
