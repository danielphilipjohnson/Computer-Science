import React, { Component } from 'react';

class EditModal extends Component {
     
    //works correct
    onChangeForm(){

        let name = this.refs.title.value;
    
        let category = this.refs.category.value.toLowerCase();
    
        let price = this.refs.price.value;
    
        let id = this.props.editRecipe.id;

        this.props.formChange(id, name, price, category, this.refs.ingredients.value);
    }
    
   //make an ingredient into a string
    ingredients(){
        let ingredients = this.props.editRecipe.ingredients;
        if(Array.isArray(ingredients)){
            let ingredientStr = ingredients.join(', ');
            return ingredientStr;
        }

        return ingredients;
    }


    isNullEmptyOrUndefined(value){
        
        // pass in null and undefined
        if (value === '' || value === null || value === undefined) {

            return false;

        }
        else {     return true;      }
            

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
    
    validation(category, title, ingredients, price) {
    
        let itemsToCheck = [category, title , price, ingredients];
        
        // Validate empty fields
        for(let i = 0; i <= itemsToCheck.length-1; i++){
            
            let itemChecked = this.isNullEmptyOrUndefined(itemsToCheck[i]);

            if(itemChecked === false){ 

                return false;

            };
        }

        // validate it is a price
        if(this.isPrice(price) === false){

            return false;

        }
        
        return true;
        
    }

    editedRecipe(num) {

        let title = this.refs.title.value;
    
        let category = this.refs.category.value.toLowerCase();
    
        let price = this.refs.price.value;
    
        let ingredients = this.refs.ingredients.value;

        

        //validation function in app maybe 
        let validation = this.validation(category, title, ingredients, price);

        if (validation === true) {
            //let id = this.props.editRecipe.id;
            this.props.editModalSubmit();
            
        }
        else {
            //validation failed
        }
    }

    deleteItem(){
    
        this.props.deleteRecipe(this.props.editRecipe.id, this.props.editRecipe.category);
    
    }
    
 


    render() {
        return (
            <div className="modal fade" id="edit-recipe" tabIndex="-1" role="dialog" aria-labelledby="edit-recipe" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit recipe</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleSelect1">Category Select</label>
                                    <select className="form-control" ref="category" id="category" value={this.props.editRecipe.category} onChange={this.onChangeForm.bind(this)}>
                                        <option value="starters">Starters</option>
                                        <option value="mains">Mains</option>
                                        <option value="desserts">Desserts </option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" ref="title" placeholder="Title" value={this.props.editRecipe.name} onChange={this.onChangeForm.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number"  step='0.01'  placeholder='0.00' className="form-control" id="price" ref="price" value={this.props.editRecipe.price} onChange={this.onChangeForm.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ingredients">Ingredients </label>
                                    <input type="text" className="form-control" id="ingredients" ref="ingredients" placeholder="Ingredient"  value={this.ingredients()} onChange={this.onChangeForm.bind(this)}/>
                                </div>
                                <a className="btn btn-primary" href="#" onClick={this.deleteItem.bind(this)}>Delete</a>
                                <button type="button" className="btn btn-primary" onClick={this.editedRecipe.bind(this, this.props.editRecipe.id)}>Edit</button>
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

export default EditModal;