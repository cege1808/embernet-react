import React from 'react';
import './Dashboard.css';
import {Navbar, Col, Row, Container, Nav} from 'react-bootstrap'
import Navigation from './components/Navigation/Navigation';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }
  handleSelect(eventKey) {
    console.log(`selected ${eventKey}`);
  }

  render(){
    return (
      <Jumbotron className="App">
        {header}
        {mapinfo}
        {graph}
      </Jumbotron>
      );
  }
}