import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { App } from './App.js';
import { About } from './Containers/About.js';
import { Contact } from './Containers/Contact.js';
import { Home } from './Containers/Home.js';
import { Show } from './Containers/Show.js';
import './App.css';

ReactDOM.render(
      <BrowserRouter>
        <div>
          <Route path='/' component={App} />
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/blog/:id' component={Show} />
        </div>
      </BrowserRouter>
, document.getElementById('root'));

