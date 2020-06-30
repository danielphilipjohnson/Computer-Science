import React, { Component } from 'react';
import Nav from './components/nav';
import Jumbotron from './components/jumbotron'
import Menu from './components/menu'
import Modal from './components/modal';
import EditModal from './components/editModal';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      edit: {}
    }
  }

  // fake recipe request
  fakedRequest() {
    return {
      starters: [
        { id: 0, name: 'White beans with herbs', price: '12.50', ingredients: ['white beans', 'herbs', 'onion', 'garlic', 'crostini or bruschetta'] },
        { id: 1, name: 'Bacon rosemary stuffed mushrooms', price: '12.50', ingredients: ['stuffed mushrooms', 'rosemary', 'bacon and cheese!'] },
        { id: 2, name: 'Creamy smoked salmon spread', price: '12.50', ingredients: ['Scottish smoked salmon trimmings', 'double cream', 'cream cheese softened', 'lemon juiced', 'chopped fresh dill', 'salt and freshly ground black pepper', 'salmon roe'] },
      ],
      mains: [
        { id: 0, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
        { id: 1, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
      ],
      desserts: [
        { id: 0, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
        { id: 1, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
      ],
    }

  }

  // a function to populate storage
  populateLocalStorage(recipes) {
    //do the local storage check 
    localStorage.setItem("_undreamtmayhem_recipe", JSON.stringify(recipes));
    this.setState({ recipes: recipes });
    //if not set state
  }

  // STORAGE FUNCTIONS
  retrieveLocalStorage() {
    let theRecipes = localStorage.getItem("_undreamtmayhem_recipe");
    let recipeObj = JSON.parse(theRecipes);
    return recipeObj;
  }

  isLocalStorageAvailable() {
    if (typeof (Storage) !== "undefined") {
      return true;
    }
    else {
      return false;
    }
  }
  ////////////////////////////////


  // Set Default Recipes VIA  local storage or react set state
  //set local storage NEXT
  setRecipes() {
    if (typeof (Storage) !== "undefined") {

      // if item doesnt exist Use a fake get request
      if (!localStorage.getItem("_undreamtmayhem_recipe")) {

        // set the data        
        let recipes = this.fakedRequest();

        // set the storage
        localStorage.setItem("_undreamtmayhem_recipe", JSON.stringify(recipes));

        let saveToSetState = this.retrieveLocalStorage();

        this.setState({
          recipe: saveToSetState
        });

      } else {
        // if recipe item exists    // pull it from local storage the set state
        let theRecipes = localStorage.getItem("_undreamtmayhem_recipe");

        let recipeObj = JSON.parse(theRecipes);

        this.setState({
          recipe: recipeObj
        });

      }
    } else {
      // No Web Storage support.. use reacts setState defaults
      alert("failed");

      this.setState(
        {
          recipe: {
            starters: [
              { id: 0, name: 'White beans with herbs', price: '12.50', ingredients: ['white beans', 'herbs', 'onion', 'garlic', 'crostini or bruschetta'] },
              { id: 1, name: 'Bacon rosemary stuffed mushrooms', price: '12.50', ingredients: ['stuffed mushrooms', 'rosemary', 'bacon and cheese!'] },
              { id: 2, name: 'Creamy smoked salmon spread', price: '12.50', ingredients: ['Scottish smoked salmon trimmings', 'double cream', 'cream cheese softened', 'lemon juiced', 'chopped fresh dill', 'salt and freshly ground black pepper', 'salmon roe'] },
            ],
            mains: [
              { id: 0, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
              { id: 1, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
            ],
            desserts: [
              { id: 0, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
              { id: 1, name: 'pizza', price: '12.50', ingredients: ['Fresh Tomatoe', 'Fresh Basil', 'Fresh Mozarella'] },
            ],
          },
        });

    }
  }

  // Allow Users to ADD recipes via local storage or react setState
  addRecipe(category, recipe) {
    //local storage 
    let localStorageAvailablity = this.isLocalStorageAvailable();


    if (localStorageAvailablity) {
      let theRecipes = localStorage.getItem("_undreamtmayhem_recipe");

      let recipeObj = JSON.parse(theRecipes);

      recipeObj[category].push(recipe);

      this.populateLocalStorage(recipeObj);

      let typeOfRecipe = this.state.recipe[category];

      typeOfRecipe.push(recipe);

      this.setState({ typeOfRecipe: recipeObj });
      $('#add-recipe .close').click();

    }
    // use react set state as alternative
    else {
      let typeOfRecipe = this.state.recipe[category];

      typeOfRecipe.push(recipe);

      this.setState({ typeOfRecipe: typeOfRecipe });
      $('#add-recipe .close').click();
    }
  }

  // Set Default Modal
  setEditModal() {
    this.setState({
      edit: {
        id: 0, name: '', price: '', category: '', ingredients: ['']
      }
    })
  }


  // Store the item we want to Edit
  // works on starters and gets catergory and id
  editRecipeFun(category, id) {

    let index = this.state.recipe[category].findIndex(x => x.id === id);
    let recipeToEdit = this.state.recipe[category][index];

    recipeToEdit['category'] = category;

    this.setState({ edit: recipeToEdit });

  }

  // EDIT MODAL FUNCTIONS 
  formChange(editedID, editedName, editedPrice, editedCategory, editedIngrients) {
    let editObj = { id: editedID, name: editedName, price: editedPrice, category: editedCategory, ingredients: editedIngrients };
    this.setState({
      edit: editObj
    });
  }

  editModalOnSubmit() {

    let editCategory = this.state.edit.category;

    let editID = this.state.edit.id;

    // editing 
    let editTitle = this.state.edit.name;

    let editPrice = this.state.edit.price;

    let editedIngrients = this.state.edit.ingredients;

    let localStorageAvailablity = this.isLocalStorageAvailable();

    let recipeToEdit = this.state.recipe[editCategory][editID];

    if (localStorageAvailablity) {
      // get local storage 
      let recipe = this.retrieveLocalStorage();

      let localRecipeToEdit = recipe[editCategory][editID];

      localRecipeToEdit.name = recipeToEdit.name = editTitle;

      localRecipeToEdit.price = recipeToEdit.price = editPrice;

      // state doesnt update
      if (Array.isArray(editedIngrients)) {

        localRecipeToEdit.ingredients = recipeToEdit.ingredients = editedIngrients;

      }
      else {

        let cleanedIngredient = this.convertIngredientToArray(editedIngrients);

        localRecipeToEdit.ingredients = recipeToEdit.ingredients = cleanedIngredient;

      }
      this.populateLocalStorage(recipe);
      
      this.setState({ recipeToEdit: recipeToEdit });
      
      $('#edit-recipe .close').click();

    }
    else {

      recipeToEdit.name = editTitle;

      recipeToEdit.price = editPrice;

      if (Array.isArray(editedIngrients)) {

        recipeToEdit.ingredients = editedIngrients;
      }

      else {

        let cleanedIngredient = this.convertIngredientToArray(editedIngrients);

        recipeToEdit.ingredients = cleanedIngredient;

        this.setState({ recipeToEdit: recipeToEdit });
      }
    }
  }


  componentWillMount() {

    this.setRecipes();

    this.setEditModal();

  }

  //GENERATES ID FOR ADDING ID
  generateID(typeOfRecipe) {

    let storageAvailablity = this.isLocalStorageAvailable();

    if (typeOfRecipe === "starters") {
      if (storageAvailablity) {
        // generate id based of length of data
        let recipeStarters = this.retrieveLocalStorage();

        let len = recipeStarters["starters"].length;

        let id = recipeStarters["starters"][len - 1].id;
        
        id++
        
        return id;

      }
      else {

        let startersLen = this.state.recipe.starters.length;

        return startersLen++;
      }
    }

    else if (typeOfRecipe === "mains") {
      if (storageAvailablity) {
        
        let recipeStarters = this.retrieveLocalStorage();

        let len = recipeStarters["mains"].length;

        let id = recipeStarters["mains"][len - 1].id;
        
        id++

        return id;

      }
      else {

        let startersLen = this.state.recipe.mains.length;

        return startersLen++;

      }
    }

    else if (typeOfRecipe === "desserts") {
      if (storageAvailablity) {

        let recipeStarters = this.retrieveLocalStorage();
        let len = recipeStarters["desserts"].length;

        let id = recipeStarters["desserts"][len - 1].id;

        id++

        return id;

      }
      else {
        let startersLen = this.state.recipe.desserts.length;
        return startersLen++;
      }
    }
  }

  convertIngredientToArray(ingredients) {
    let stringArr = ingredients.split("");

    // Remove comma at beginning
    if (stringArr[0] === ",") {
      stringArr.splice(0, 1);
    }
    // Remove comma at the end
    if (stringArr[stringArr.length - 1] === ',') {
      stringArr.pop();
    }
    // Make it back to a string
    var joined = stringArr.join("");

    // Remove whitespace
    let whitespacedRemoved = joined.replace(/\s/g, '');

    // Convert to validated Array
    let covertedIngredients = whitespacedRemoved.split(',');

    return covertedIngredients;
  }

  // DELETE RECIPE
  deleteRecipe(id, category) {

    // need to remove from local storage
    let recipe = this.retrieveLocalStorage();

    let localStorageItemToDelete = recipe[category];

    let index = localStorageItemToDelete.findIndex(x => x.id === id);

    localStorageItemToDelete.splice(index, 1);

    this.populateLocalStorage(recipe);
    //set Local storage

    //let itemToDelete = this.state.recipe[category];

    //let index = itemToDelete.findIndex(x => x.id === id);

    //itemToDelete.splice(index, 1);

    this.setState({ recipe: recipe });
  }

  //edit recipe is setting state
  render() {
    return (
      <div>
        <Nav />
        <Jumbotron />
        <Menu recipes={this.state.recipe} changeRecipe={this.editRecipeFun.bind(this)} />
        <Modal addRecipe={this.addRecipe.bind(this)} generateID={this.generateID.bind(this)} />
        <EditModal editRecipe={this.state.edit} deleteRecipe={this.deleteRecipe.bind(this)} formChange={this.formChange.bind(this)} editModalSubmit={this.editModalOnSubmit.bind(this)} />
      </div>
    );
  }
}

export default App;
