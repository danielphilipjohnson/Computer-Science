import React, { Component } from 'react';

import {DISHES} from './shared/dishes';


import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';


import Main from './components/MainComponent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
