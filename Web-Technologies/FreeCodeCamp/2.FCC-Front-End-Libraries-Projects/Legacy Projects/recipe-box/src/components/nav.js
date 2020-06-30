import React, { Component } from 'react';


class Nav extends Component {
  render() {
    return (
         <nav className="nav navbar-inverse justify-content-center">
            <a className="nav-link active" href="#">HOME</a>
            <a className="nav-link" href="#">MENU</a>
            <a className="nav-link" href="#">ABOUT</a>
        </nav>
    );
  }
}

export default Nav;
