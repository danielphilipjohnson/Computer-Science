import React, { Component } from 'react';
import Ingredients from './ingredients';


class Starter extends Component {
    
    
    render() {
        let recipeElement;
        if (this.props.starters) {
            recipeElement = this.props.starters.map(starter => {
                return (

                    <div className="recipes" key={starter.id} >
                        <div className="recipe-info">
                            <p>{starter.name}</p>
                            <button type="button" className="btn btn-item">{starter.price}</button>
                        </div>
                        <Ingredients ingredients={starter.ingredients} starterID={starter.id} category={"starters"} changeRecipe={this.props.changeRecipe}/>

                    </div>
                )

            })
        }
        return (
            <div className="tab-pane active" id="starters" role="tabpanel">
                {recipeElement}
            </div>
        );
    }
}

export default Starter;
