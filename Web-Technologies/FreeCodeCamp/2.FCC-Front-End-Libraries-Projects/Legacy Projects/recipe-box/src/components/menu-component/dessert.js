import React, { Component } from 'react';
import Ingredients from './ingredients';

//send props to ingrients 
class Dessert extends Component {
    render() {
        let recipeElement;
        if (this.props.desserts) {
            recipeElement = this.props.desserts.map(dessert => {
                return (
                    <div className="recipes" key={dessert.id}>
                        <div className="recipe-info">
                            <p>{dessert.name}</p>
                            <button type="button" className="btn btn-item">{dessert.price}</button>
                        </div>
                        <Ingredients ingredients={dessert.ingredients} starterID={dessert.id} category={"desserts"} changeRecipe={this.props.changeRecipe}/>
                    </div>
                )

            })
        }

        return (
            <div className="tab-pane" id="desserts" role="tabpanel">
                {recipeElement}
            </div>
        );
    }
}

export default Dessert;
