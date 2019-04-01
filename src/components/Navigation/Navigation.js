import React from 'react';
import './Navigation.css';
import {Container, Nav} from 'react-bootstrap'

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(eventKey, e) {
    // console.log(`selected ${eventKey}`);
    this.props.onChangePage(eventKey);
  }

  render(){
    return (
      <Container>
        <Nav
          onSelect={this.handleSelect}
          fill={true}
        >
          <Nav.Item>
            <Nav.Link><img src="logo.png" height="100" className="d-inline-block align-top" alt="embernet logo" /></Nav.Link>
          </Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dashboard" className="navigation active">DASHBOARD</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="analytics" className="navigation">ANALYTICS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings" className="navigation">SETTINGS</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      );
  }
}