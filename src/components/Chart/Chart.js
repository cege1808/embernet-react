import React from 'react';
import './Chart.css';
import {Line} from 'react-chartjs-2'
import {chartOptions} from '../Constants';

export default class Chart extends React.Component {
  // Flag to check whether the parent is grabbing values,
  // if it isn't we don't update
  shouldComponentUpdate = (nextProps) => {
    return this.props.data !== nextProps.data;
  }
  render(){
    return (
      <Line data={this.props.data}
            options={chartOptions}
            ref={ref => this.props.chartRef(ref)}
      />
      )
  }
}