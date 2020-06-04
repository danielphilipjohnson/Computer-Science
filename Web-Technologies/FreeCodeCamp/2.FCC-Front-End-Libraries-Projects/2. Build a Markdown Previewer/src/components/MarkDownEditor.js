import React, { Component } from 'react';

class MarkDownEditor extends Component {
  constructor(){
    super()
      // This binding is necessary to make `this` work in the callback
      this.updateMarkup = this.updateMarkup.bind(this);
      this.upDateTitle = this.upDateTitle.bind(this);
  }
  
  updateMarkup(event){
    this.props.changeMarkup(event.target.value);
  }

  upDateTitle(event){
    this.props.changeTitle(event.target.value);
  }

  render() {
    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">UserName</h5>
              <i className="fa fa-cog" aria-hidden="true"></i>
            </div>
            <div className="modal-body d-flex flex-column">
              <input className="blog-title" placeholder="Blog Title" type="text" onChange={this.upDateTitle}/>
              <textArea className="blog-content" value={this.props.text} onChange={this.updateMarkup} />
            </div>
            <div className="modal-footer d-flex flex-row justify-content-between">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarkDownEditor;
