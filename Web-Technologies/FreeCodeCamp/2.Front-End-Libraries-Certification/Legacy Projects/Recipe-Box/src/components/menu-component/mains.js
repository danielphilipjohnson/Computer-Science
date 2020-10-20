import React, { Component } from 'react';
import Ingredients from './ingredients';


class Mains extends Component {
      
  
    render() {
        let recipeElement;
        if (this.props.mains) {
            recipeElement = this.props.mains.map(main => {
                return (
                    <div className="recipes" key={main.id}>
                        <div className="recipe-info">
                            <p>{main.name}</p>
                            <button type="button" className="btn btn-item">{main.price}</button>
                        </div>
                        <Ingredients  ingredients={main.ingredients}  starterID={main.id} category={"mains"} changeRecipe={this.props.changeRecipe}/>

                    </div>
                )
            });
        }
        return (
            <div className="tab-pane" id="mains" role="tabpanel">
                {recipeElement}
            </div>
        );
    }
}

export default Mains;
