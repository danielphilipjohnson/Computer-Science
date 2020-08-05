import React, { Component } from 'react';
import TableBody from './components/tableBody';
import $ from "jquery";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top100: [],
      recent: [],
      current: []
    };
  }

  //ajax request
  getTop100() {
    // do a ajax request
     $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", (data, status)=> {
        this.setState({top100: data});
    });
  }

  getRecent() {
    $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", (data, status)=> {
        this.setState({recent: data});
        this.setState({current: data});
    });
  }

  setTop100() {
    this.setState({
      current: this.state.top100
    });
  }

  setToRecent() {

    this.setState({
      current: this.state.recent 
    });



  }
  componentWillMount() {
    this.getRecent();

    this.getTop100();

    this.setToRecent();

  }
  
  
  render() {
    return (
      <table className="table ">
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th className="dropdown-toggle" onClick={this.setToRecent.bind(this)}>Points in past 30 days</th>
            <th className="dropdown-toggle"onClick={this.setTop100.bind(this)} >All time points</th>
          </tr>
        </thead>
        <TableBody current={this.state.current}  />
      </table>

    );
  }
}

export default App;
