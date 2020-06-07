import React, { Component } from 'react';

class Modal extends Component {

    isNullEmptyOrUndefined(value){        
        // pass in null and undefined
        if (value === '' || value === null || value === undefined) {
            return false;
        }
        return true;
    }

    isPrice(value){
        let checkPrice = parseFloat(value);
        if(isNaN(checkPrice)){
            return false;
        }
        else {
            return true;
        }

    }
    convertIngredientToArray(ingredients){
        let stringArr = ingredients.split("");

        // Remove comma at beginning
        if(stringArr[0] === ","){
            stringArr.splice(0, 1);
        }
        // Remove comma at the end
        if(stringArr[stringArr.length-1] === ','){
             stringArr.pop();
        }
        // Make it back to a string
        var joined =stringArr.join("");
        
        // Remove whitespace
        let whitespacedRemoved = joined.replace(/\s/g,'');
        
        // Convert to validated Array
        let covertedIngredients = whitespacedRemoved.split(',');
        
        return covertedIngredients;
    }

    validation(catergory, title, ingredients, price) {
    
        let itemsToCheck = [catergory, title , price, ingredients];
        
        // Validate empty fields
        for(let i = 0; i <= itemsToCheck.length-1; i++){
            
            let itemChecked = this.isNullEmptyOrUndefined(itemsToCheck[i]);

            if(itemChecked === false){ 
                return false;
            };
        }
        // validate it is a priceL
        if(this.isPrice(price) === false){
            return false;
        }
        return true;
        
    }
    

    addRecipe(ev) {
        ev.preventDefault();

        let title = this.refs.title.value;
    
        let category = this.refs.catergory.value;
    
        let price = this.refs.price.value;
    
        let ingredients = this.refs.ingredients.value;
        
      
        let validation = this.validation(category, title, ingredients, price);

        if (validation === true) {

            let ingredientsArr = this.convertIngredientToArray(ingredients);

            if (category === "Starters") {
                //this.props.
                //this.generateID();
                let newID = this.props.generateID('starters');
                let recipe = { id: newID, name: title, price: price, ingredients: ingredientsArr };
                this.props.addRecipe('starters', recipe);
                
            }  else if (category === "Mains") {
                let newID = this.props.generateID('mains');
                let recipe = { id: newID, name: title, price: price, ingredients: ingredientsArr };
                this.props.addRecipe('mains', recipe);


            }
            else if (category === "Desserts") {
                let newID = this.props.generateID('desserts');
                let recipe = { id: newID, name: title, price: price, ingredients: ingredientsArr };
                this.props.addRecipe('desserts', recipe);

            }
        }
        else {
                // failed validation
        }
    }

    render() {
        return (
            <div className="modal fade" id="add-recipe" tabIndex="-1" role="dialog" aria-labelledby="add-recipe" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add recipe</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.addRecipe.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="exampleSelect1">Catergory Select</label>
                                    <select className="form-control" ref="catergory" id="catergory">
                                        <option>Starters</option>
                                        <option>Mains</option>
                                        <option>Desserts</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" ref="title" placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number"  step='0.01'  placeholder='0.00' className="form-control" id="price" ref="price" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ingredients">Ingredients</label>
                                    <input type="text" className="form-control" id="ingredients" ref="ingredients" placeholder="Ingredient" />
                                </div>
                                <a className="btn btn-primary" href="#">Add</a>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;