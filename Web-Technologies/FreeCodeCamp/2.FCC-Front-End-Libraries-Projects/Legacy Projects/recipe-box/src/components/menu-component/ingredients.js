import React, { Component } from 'react';

class Ingredients extends Component {
    changeRecipe(num, catergory) {

        this.props.changeRecipe(catergory, num);

    }
    render() {


        const ingredients = this.props.ingredients;
        let i = 0;
        let ingredientItem;
        if (ingredients) {
            ingredientItem = ingredients.map(ingredient => {
                return (
                    <li key={i++} className="ingredient">{ingredient}, </li>
                )
            });
        };

        return (
            <div className="ingredients">
                <ul className="ingredients-list">
                    {ingredientItem}
                </ul>
                <button type="button" className="btn btn-edit" href="#" role="button" data-toggle="modal" data-target="#edit-recipe" onClick={this.changeRecipe.bind(this, this.props.starterID, this.props.category)}>edit</button>
            </div>
        );
    }
}

export default Ingredients;







