import React, { Component } from 'react';


class Tabs extends Component {
    render() {
        return (
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item menu-item">
                    <a className="nav-link active" data-toggle="tab" href="#starters" role="tab">Starters</a>
                </li>
                <li className="nav-item menu-item">
                    <a className="nav-link" data-toggle="tab" href="#mains" role="tab">Mains</a>
                </li>
                <li className="nav-item menu-item">
                    <a className="nav-link" data-toggle="tab" href="#desserts" role="tab">Desserts</a>
                </li>
            </ul>
        );
    }
}

export default Tabs;
