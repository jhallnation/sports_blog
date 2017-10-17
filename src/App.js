import React, { Component } from 'react';
import { Nav } from './Nav.js';
import './App.css';



export class App extends Component {
  render() {
    return (
      <div>
        <Nav />     
        <div className="App">
        </div>
      </div>
    );
  }
}

export default App;
