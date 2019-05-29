import React, { Component } from "react";
import logo from "./logo.svg";
import "./Main.css";

class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Go to /shows for Movies Calendar</h1>
        </header>
      </div>
    );
  }
}

export default Main;
