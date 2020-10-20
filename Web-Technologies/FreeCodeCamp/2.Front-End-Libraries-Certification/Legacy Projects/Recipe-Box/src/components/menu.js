import React, { Component } from 'react';
import Tabs from './menu-component/tabs';
import TabContent from './menu-component/tab-content';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <h2 className="menu-title">Your Menu</h2>
                <div className="container">
                    <Tabs />
                    <TabContent recipes={this.props.recipes} changeRecipe={this.props.changeRecipe}/>
                </div>
            </div>
        );
    }
}

export default Menu;
