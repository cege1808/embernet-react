import React from 'react';
import './ChartContainer.css';
import Chart from '../Chart/Chart';
import moment from 'moment';
import {Container, Row, Col} from 'react-bootstrap';
import ModeSelector from '../ModeSelector/ModeSelector';
import {data, request} from '../Constants';

export default class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.lastCursor = null;
    this.vals = [];
    this.chartRef = null;
    this.state = {
      startTime: moment(),
      endTime: moment(),
      live: false,
      graph: data,
      updating: false,
      infoOn: true,
      coordinates: []
    }
  }
  // Handle the start time change
  handleChangeStart = (time) => {
    console.log('change start');
    this.setState({
      startTime: time
    })
  }

  // Handle the end time change
  handleChangeEnd = (time) => {
    this.setState({
      endTime: time
    })
  }

  //Handle the current boolean for "live" plotting
  handleChangeLive = (e) => {
    let status = e.target.checked;
    if (status) {
      this.setState({
        live: true,
        endTime: null
      })
      this.intervalHandler();
    } else {
      clearTimeout(this.timeout);
      this.setState({
        live: false
      })
      this.handleChangeEnd(moment());
    }
  }

  intervalHandler = async () => {
    await this.getData();
    console.log("get data done, resetting");
    if (this.state.live) {
      this.timeout = setTimeout(this.intervalHandler, 2000);
    }
  }

  // POST using OAuth creds to retrieve datastore based on time
  // Async means it returns an implicit Promise that we will resolve later
  getDataHandler = async (type, mode) => {
    console.log('run data handler');
    // Build our query
    let req = request(this.state, type);

    // Change our lastCursor value
    if (this.lastCursor !== null) req.query.startCursor = this.lastCursor;
    // Call our fetch
    await fetch('https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json',
      {
        method: 'POST',
        headers: {
          'Authorization' : 'Bearer ' + this.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(req)}).then(val => val.json().then(e => {
        // Try safety
        try {
          if ('entityResults' in e.batch) {
            console.log(e.batch);
            if (this.lastCursor === null) {
              this.vals = [];
            } else {
              this.vals = this.vals.slice(); // Return a copy
            }
            e.batch.entityResults.forEach(d => {
              console.log(d);
              // For a coordinate
              // if (mode === 0) {
              //   let elem = {};
              //   elem.y = parseFloat(d.entity.properties.data.stringValue);
              //   elem.x = moment(d.entity.properties.created_at.stringValue);
              //   // Check if the last element was greater than 10 minutes ago
              //   if (this.vals.length > 0 && elem.x.unix() - moment(this.vals[this.vals.length - 1].x).unix() > 600) {
              //     this.vals.push({
              //       y: NaN,
              //       x: elem.x
              //     });
              //   }
              //   this.vals.push(elem);
              // } else {
              //   // Convert to lat/long here
              //   // Sample NMEA seq "$GPRMC,033404.000,A,4915.6993,N,12314.9440,W,0.45,107.40,060319,,,A*72",
              //   let NMEASeq = d.entity.properties.data.stringValue.split(',');
              //   let lat = parseInt(parseInt(NMEASeq[3]) / 100) + parseFloat(parseFloat(NMEASeq[3]) % 100) / 60;
              //   let lng = parseInt(parseInt(NMEASeq[5]) / 100) + parseFloat(parseFloat(NMEASeq[5]) % 100) / 60;
              //   lat = (NMEASeq[4] === "S") ? -lat : lat;
              //   lng = (NMEASeq[6] === "W") ? -lng : lng;
              //   let elem = {};
              //   elem.lat = lat;
              //   elem.lng = lng;
              //   this.vals.push(elem);
              // }
            });
          } else {
            // Clear our values
            this.vals = [];
          }
          if (e.batch.moreResults === "NOT_FINISHED") {
            console.log("Not done");
            this.lastCursor = e.batch.endCursor;
            return this.DataHandler(type, mode);
          }
        } catch (error) {
          console.log(error);
        }
        console.log("Done");
        this.lastCursor = null;
        return true;
      }));
  }

  // Handler for our data, which sets up a promise
  // that updates once our data has been set up
  getData = async () => {
    console.log('run get data');
    this.setState({
      updating: true // Set updating to true so we render notice
    });
    let newData = [
      ...this.state.graph.datasets, // Spread operator allows us to copy things
    ];
    // Get velocity
    if (this.chartRef !== null && this.chartRef.props.data.datasets[0]._meta[0].hidden !== true) {
      await this.getDataHandler('temperature', 0);
      newData[0].data = this.vals;
    }
    // Get power
    if (this.chartRef !== null && this.chartRef.props.data.datasets[1]._meta[0].hidden !== true) {
      await this.getDataHandler('pressure', 0);
      newData[1].data = this.vals;
    }
    // Get location
    await this.getDataHandler('position', 1);
    // Parse location here
    console.log(this.vals);
    this.setState({
      graph: {
        datasets: newData
      },
      coordinates: this.vals.slice(),
      updating: false // done updating
    });
  }


  getChartRef = (ref) => {
    // Get reference to the chart
    if (this.chartRef === null && ref !== null) {
      this.chartRef = ref;
    }
  }

  render(){
    return (
      <Container>
        <ModeSelector
          startVal = {this.state.startTime}
          endVal = {this.state.endTime}
          live = {this.state.live}
          onChangeStart = {this.handleChangeStart}
          onChangeEnd = {this.handleChangeEnd}
          onChangeLive= {this.handleChangeLive}
        />
        <Row>
          <Chart data={this.state.graph} chartRef={this.getChartRef} />
        </Row>
      </Container>

      )
  }
}