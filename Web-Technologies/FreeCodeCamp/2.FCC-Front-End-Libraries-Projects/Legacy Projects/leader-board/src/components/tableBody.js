import React, { Component } from 'react';


// add boot strap here
// how to determine the two json files as one
//past 30 days first on click change the rows
class TableBody extends Component {

  render() {

    let tableData;
    let id = 0;

    if(this.props.current){

        tableData = this.props.current.map(data => {
            return (
                <tr>
                    <td>{id += 1}</td>
                    <td><img src={data.img} className="img-thumbnail float-left" /> <h4 className="username">{data.username}</h4></td>
                    <td>{data.recent} </td>
                    <td>{data.alltime}</td>
                </tr>
            )
        })
    }

    return (
        <tbody>
            {tableData}
        </tbody>
                    
    );
  }
}

export default TableBody;
