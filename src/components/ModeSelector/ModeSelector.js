import React from 'react';
import './ModeSelector.css';
import {Row, Col, Button} from 'react-bootstrap';
import moment from 'moment';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import {DatetimePickerTrigger} from 'rc-datetime-picker';

const shortcuts = {
    'Today': moment(),
    'Yesterday': moment().subtract(1, 'days'),
};

export default class DayRange extends React.Component {
  render(){
    return (
      <Row className="dayrange">
        <Col>
          <DatetimePickerTrigger
            className = "input is-rounded is-small"
            shortcuts = {shortcuts}
            moment = {this.props.startVal}
            onChange = {this.props.onChangeStart}>
            <input type="text" value={this.props.startVal.format('YYYY-MM-DD HH:mm')} readOnly />
          </DatetimePickerTrigger>
        </Col>
        <Col>
          <DatetimePickerTrigger
            className = "input is-rounded is-small"
            shortcuts = {shortcuts}
            moment = {this.props.endVal}
            onChange = {this.props.onChangeEnd}
            disabled = {(this.props.endVal === null) ? true : false}>
            <input
              type = "text"
              value = {(this.props.endVal === null) ?
                "Current" : this.props.endVal.format('YYYY-MM-DD HH:mm')}
              readOnly
              disabled = {(this.props.endVal === null) ? true : false}
            />
          </DatetimePickerTrigger>
        </Col>
        <Col className="modeselector-toggle">
          <Toggle
            defaultChecked = {this.props.live}
            onChange = {this.props.onChangeLive}
          />
        </Col>
        <Col>
          <Button
            disabled={this.props.updating}
            variant="dark"
            onClick={this.props.onUpdate}
          >
            Update
          </Button>
        </Col>

      </Row>
      )
  }
}