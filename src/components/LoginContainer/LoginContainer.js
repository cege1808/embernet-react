import React from 'react';
import './LoginContainer.css';
import GoogleLogin from 'react-google-login';
import {Row, Col} from 'react-bootstrap';

export default class InfoContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
    }
  }
  // OAuth authorized, do stuff
  responseGoogle = (response) => {
    this.setState({
      loggedIn: true,
    });
    console.log(response);
    console.log("Success");
    this.props.onChangeLogin(this.state.loggedIn, response.accessToken);
  }

  // OAuth failed, don't do stuff
  responseFail = (response) => {
    console.log(response);
    console.log("Failed");
  }

  render(){
    return (
      <Row className="login">
        <Col>
        <GoogleLogin
        clientId = "1082753030684-esf02ot6g648m6slcmf2n3j8np778j91.apps.googleusercontent.com"
        buttonText = "Login"
        onSuccess = {this.responseGoogle}
        onFailure = {this.responseFail}
        scope={"https://www.googleapis.com/auth/datastore"}
        />
        </Col>
      </Row>
      )
  }
}