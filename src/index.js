import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { App } from './App.js';
import { About } from './About.js';
import { Contact } from './Contact.js';
import { Home } from './Home.js';
import './index.css';

ReactDOM.render(
      <BrowserRouter>
        <div>
          <Route path='/' component={App} />
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
        </div>
      </BrowserRouter>
, document.getElementById('root'));

