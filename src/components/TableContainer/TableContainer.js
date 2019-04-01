import React from 'react';
import './TableContainer.css';
import {Table} from 'react-bootstrap';


export default class TableContainer extends React.Component {
  constructor(props){
    super(props);
    this.props.onMount();
    this.renderRows = this.renderRows.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    let node = JSON.parse(e.currentTarget.dataset.node);
    // console.log(node);
    this.props.onRowClick(node);
  }

  renderRows(){
    let rows = [];
    this.props.rows.forEach((node) => {
      // console.log(node);
      rows.push(
        <tr key={node.id} onClick={this.handleClick} data-node={JSON.stringify(node)}>
          <td>{node.id}</td>
          <td>{node.lat}</td>
          <td>{node.lng}</td>
          <td>{node.status.toUpperCase()}</td>
          <td>{node.system_warning.toUpperCase()}</td>
        </tr>
      );
    });
    // console.log(rows);
    return rows;
  }


  render(){
    return (
      <Table responsive className="table-container">
        <thead>
          <th>NODE #</th>
          <th>LONGITUDE</th>
          <th>LATITUDE</th>
          <th>STATUS</th>
          <th>SYSTEM WARNING</th>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </Table>
      )
  }
}
