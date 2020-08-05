import React, { Component } from 'react';
var marked = require('marked');

class DisplayContainer extends Component {
  rawMarkup(value){
    var rawMarkup = marked(value, {sanitize: true});
    return{__html: rawMarkup };
  }
  render() {
    return (
      <div className="created-blog">
      <h1>{this.props.title}</h1>
      <p dangerouslySetInnerHTML={this.rawMarkup(this.props.newText)} />
      </div>
    );
  }
}

export default DisplayContainer;
