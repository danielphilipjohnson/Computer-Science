import React, { Component } from 'react';


class Jumbotron extends Component {
  render() {
    return (
          <div className="jumbotron">
            <h3 className="display-4 text-center jumbotron-title">Recipe Box</h3>
            <p className="lead text-center jumbotron-content">
            <a className="btn btn-lg btn-recipe" href="#" role="button" data-toggle="modal" data-target="#add-recipe">Add a recipe</a>
            </p>
        </div>
    );
  }
}

export default Jumbotron;
