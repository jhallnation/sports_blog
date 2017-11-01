import React, { Component } from 'react';
import { Nav } from './Components/Nav.js';

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
