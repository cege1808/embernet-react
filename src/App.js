import React, { Component } from 'react';
import './App.css';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';
import Navigation from './components/Navigation/Navigation';
import MapContainer from './components/MapContainer/MapContainer';
import InfoContainer from './components/InfoContainer/InfoContainer';
// import ChartContainer from './component s/ChartContainer/ChartContainer';
import LoginContainer from './components/LoginContainer/LoginContainer';
import Chart from './components/Chart/Chart';
import moment from 'moment';
import ModeSelector from './components/ModeSelector/ModeSelector';
import {data, requestAllNodes, requestNode, requestEnvironmentalData} from './components/Constants';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import TableContainer from './components/TableContainer/TableContainer';

const dataType = {
  temperature: 'doubleValue',
  temperature_analog: 'doubleValue',
  pressure: 'doubleValue',
  humidity: 'doubleValue',
  eco2: 'integerValue',
  tvoc: 'integerValue',
  lightning_distance: 'integerValue'
}

class App extends Component {
  constructor(props){
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
      nodes: [], // {location: 'vancouver', position: {lat: 49.278, lng: -123.121}}
      loggedIn: false,
      currentNodeId: null,
      currentLocation: {},
      currentNodeData: {},
      currentNodeStatus: '',
      pageState: 'analytics',
      pageSettings: 'hidden',
      displayTable: false
    }
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleToggleMapTable = this.handleToggleMapTable.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeLive = this.handleChangeLive.bind(this);
    this.intervalHandler = this.intervalHandler.bind(this);
    this.getAllNodes = this.getAllNodes.bind(this);
    // this.getNode = this.getAllNodes.bind(this);
    // this.getDataHandler = this.getDataHandler.bind(this);
    // this.getData = this.getData.bind(this);
    this.getChartRef = this.getChartRef.bind(this);
  }

  handleLogin = (loggedIn, token) => {
    this.setState({
      loggedIn: loggedIn
    })
    this.token = token;
  }

  // Handle the start time change
  handleChangeStart = (time) => {
    // console.log('change start');
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

  handleMarkerClick = (marker) => {
    // console.log(marker);
    let data = marker.data;
    this.setState({
      currentNodeId: data.id,
      currentLocation: {lat: data.lat, lng: data.lng},
      currentNodeStatus: data.status
    })
  }

  handleRowClick = (row) => {
    this.setState({
      currentNodeId: row.id,
      currentLocation: {lat: row.lat, lng: row.lng},
      currentNodeStatus: row.status
    })
  }

  intervalHandler = async () => {
    await this.getData();
    console.log("get data done, resetting");
    if (this.state.live) {
      this.timeout = setTimeout(this.intervalHandler, 2000);
    }
  }

  getAllNodes = async () => {
    // console.log('getAllNodes');
    // Build our query
    let req = requestAllNodes();

    // Change our lastCursor value
    if (this.lastCursor !== null) req.query.startCursor = this.lastCursor;

    // Call our fetch
    await fetch("https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json",
      {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${this.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(req)}).then(val => val.json().then(e => {
        // Try safety
        try {
          // console.log(e);
          if ('entityResults' in e.batch) {
            // console.log(e.batch);
            if (this.lastCursor === null) {
              this.vals = [];
            } else {
              this.vals = this.vals.slice(); // Return a copy
            }
            let newNodes = [];
            e.batch.entityResults.forEach(d => {
              // For a coordinate
              // console.log(d);
              newNodes.push({
                id: d.entity.properties.node_id.integerValue,
                lng: d.entity.properties.position.geoPointValue.longitude,
                lat: d.entity.properties.position.geoPointValue.latitude,
                status: d.entity.properties.status.stringValue,
                system_warning: d.entity.properties.system_warning.stringValue
              })
            });
            this.setState({
              nodes: newNodes
            })
          } else {
            // Clear our values
            this.vals = [];
          }
          if (e.batch.moreResults === "NOT_FINISHED") {
            console.log("Not done");
            this.lastCursor = e.batch.endCursor;
            return this.getAllNodes();
          }
        } catch (error) {
          console.log(error);
        }
        // console.log(this.vals);
        // console.log("Done");
        // console.log(this.state.nodes);
        this.lastCursor = null;
        return true;
      }));
  }

  getNode = async () => {
    // console.log('get node data');
    // Build our query
    let req = requestNode(this.state);

    // Change our lastCursor value
    if (this.lastCursor !== null) req.query.startCursor = this.lastCursor;

    // Call our fetch
    await fetch("https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json",
      {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${this.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(req)}).then(val => val.json().then(e => {
        // Try safety
        try {
          // console.log(e);
          if ('entityResults' in e.batch) {
            // console.log(e.batch);
            if (this.lastCursor === null) {
              this.vals = [];
            } else {
              this.vals = this.vals.slice(); // Return a copy
            }
            // console.log(e.batch.entityResults);
            let data = e.batch.entityResults[0].entity.properties;
            console.log(data);

            this.setState({
              currentNodeData: {
                temperature: data.temperature ? data.temperature[dataType['temperature']] : null,
                temperature_analog: data.temperature_analog ? data.temperature_analog[dataType['temperature_analog']] : null,
                pressure: data.pressure ? data.pressure[dataType['pressure']] : null,
                humidity: data.humidity ? data.humidity[dataType['humidity']] : null,
                eco2: data.eco2 ? data.eco2[dataType['eco2']] : null,
                tvoc: data.tvoc ? data.tvoc[dataType['tvoc']] : null,
                lightning_distance: data.lightning_distance ? data.lightning_distance[dataType['lightning_distance']] : null,
                created_at: data.created_at.stringValue
              }
            })
          } else {
            // Clear our values
            this.vals = [];
          }
          if (e.batch.moreResults === "NOT_FINISHED") {
            console.log("Not done");
            this.lastCursor = e.batch.endCursor;
            return this.getNode();
          }
        } catch (error) {
          console.log(error);
        }
        // console.log(this.vals);
        // console.log("Done");
        // console.log(this.state.nodes);
        this.lastCursor = null;
        return true;
      }));
  }

  // POST using OAuth creds to retrieve datastore based on time
  // Async means it returns an implicit Promise that we will resolve later
  getDataHandler = async (type) => {
    console.log('run data handler');
    // Build our query
    let req = requestEnvironmentalData(this.state);
    console.log(req);
    // Change our lastCursor value
    if (this.lastCursor !== null) req.query.startCursor = this.lastCursor;

    // Call our fetch
    await fetch("https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json",
      {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${this.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(req)}).then(val => val.json().then(e => {
        // Try safety
        try {
          console.log(e);
          if ('entityResults' in e.batch) {
            console.log(e.batch);
            if (this.lastCursor === null) {
              this.vals = [];
            } else {
              this.vals = this.vals.slice(); // Return a copy
            }
            e.batch.entityResults.forEach(d => {
              // For a coordinate
              console.log(d);
              let elem = {};
              elem.y = parseFloat(d.entity.properties[type][dataType[type]]);
              elem.x = moment(d.entity.properties.created_at.stringValue);
              // Check if the last element was greater than 10 minutes ago
              if (this.vals.length > 0 && elem.x.unix() - moment(this.vals[this.vals.length - 1].x).unix() > 600) {
                this.vals.push({
                  y: NaN,
                  x: elem.x
                });
              }
              this.vals.push(elem);
            });
          } else {
            // Clear our values
            this.vals = [];
          }
          if (e.batch.moreResults === "NOT_FINISHED") {
            console.log("Not done");
            this.lastCursor = e.batch.endCursor;
            return this.DataHandler(type);
          }
        } catch (error) {
          console.log(error);
        }
        console.log(this.vals);
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
    // Get temperature
    if (this.chartRef !== null && this.chartRef.props.data.datasets[0]._meta[0].hidden !== true) {
      await this.getDataHandler('temperature');
      newData[0].data = this.vals;
    }
    // Get pressure
    if (this.chartRef !== null && this.chartRef.props.data.datasets[1]._meta[0].hidden !== true) {
      await this.getDataHandler('pressure');
      newData[1].data = this.vals;
    }
    // Get humidity
    if (this.chartRef !== null && this.chartRef.props.data.datasets[2]._meta[0].hidden !== true) {
      await this.getDataHandler('humidity');
      newData[2].data = this.vals;
    }
    this.setState({
      graph: {
        datasets: newData
      },
      // currentLocation: this.vals.slice(),
      updating: false // done updating
    });
  }

  getChartRef = (ref) => {
    // Get reference to the chart
    if (this.chartRef === null && ref !== null) {
      this.chartRef = ref;
    }
  }

  handleChangePage = (eventKey) => {
    if(eventKey === "settings"){
      this.setState({pageSettings: ''})
    }
    else{
      this.setState({ pageState: eventKey})
    }
  }

  handleSideBarClick = (e) => {
    e.preventDefault();
    this.setState({pageSettings: 'hidden'})
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    await this.getData();
  }

  handleToggleMapTable(){
    this.setState({displayTable: !this.state.displayTable})
  }

  loginPage(){
    let homepagelogo = (
        <Row className="d-inline-block align-top homepage-logo">
          <img src="logo.png" height="300" alt="embernet logo" />
        </Row>
      );
    return (
      <Jumbotron className="App">
        {homepagelogo}
        <LoginContainer onChangeLogin={this.handleLogin} />
      </Jumbotron>
    );
  }

  dashboardPage(){
    return (
      <div>
        <Jumbotron className="App">
          <Navigation onChangePage={this.handleChangePage}/>
          <Container className="main-body">
            <Row>
              <Col xs={8} className="map overview-map" >
                <Row>
                  <MapContainer
                    markers={this.state.nodes}
                    onMarkerClick={this.handleMarkerClick}
                    onMount={this.getAllNodes}
                   />
                 </Row>
                 <Row>
                  <div className="overview-systemwarning systemwarning">
                    <h3 className="bold">System Warnings</h3>
                    <div className="details">
                      <p>10239//04302019//13:14:40//"Lightning Detected - 4 km away."</p>
                      <p>00281//04302019//13:14:30//"Lightning Detected - 12 km away."</p>
                      <p>10239//04302019//13:14:25//"Error Message."</p>
                      <p>10239//04302019//13:14:22//"RISK elevated to HIGH."</p>
                      <p>10239//04302019//13:14:14//"RISK lowered to LOW."</p>
                      <p>10239//04302019//13:14:12/"Communication with node lost. Investigate further."</p>
                      <p>10239//04302019//13:14:8//"LOW POWER. Battery at 4%. Plan for extraction."</p>
                      <p>10239//04302019//13:14:7//"Node in extraction mode"</p>
                    </div>
                  </div>
                 </Row>
              </Col>
              <Col xs={3} className="overview" >
                <Row className="overview-box">
                  <Col className="bold overview-number">384</Col>
                  <Col className="overview-desc">Active Nodes</Col>
                </Row>
                <Row className="overview-box">
                  <Col className="bold overview-number">3</Col>
                  <Col className="overview-desc">Offline Nodes</Col>
                </Row>
                <Row className="overview-box">
                  <Col className="bold overview-number">24</Col>
                  <Col className="overview-desc">New Nodes</Col>
                </Row>
                <Row className="overview-box">
                  <Col className="bold overview-number">2</Col>
                  <Col className="overview-desc">Active Fires</Col>
                </Row>
                <Row className="overview-box">
                  <Col className="bold overview-number">5</Col>
                  <Col className="overview-desc">KM2 On Fire</Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        {this.settingsPage()}
      </div>
      );
  }

  mapOrTable(){
    if(this.state.displayTable){
      return (<Col xs={12} className="overview-table" >
        <TableContainer
          rows={this.state.nodes}
          onRowClick={this.handleRowClick}
          onMount={this.getAllNodes}
        />
      </Col>);
    }
    else{
      return(
        <Col xs={12} className="overview-map" >
          <MapContainer
            markers={this.state.nodes}
            onMarkerClick={this.handleMarkerClick}
            onMount={this.getAllNodes}
           />
        </Col>
        )
    }
  }

  toggleSystemWarning(){
    if(this.state.currentNodeId){
      return (
        <div>
        <p>10239//04302019//13:14:40//"Lightning Detected - 4 km away."</p>
        <p>00281//04302019//13:14:30//"Lightning Detected - 12 km away."</p>
        <p>10239//04302019//13:14:25//"Error Message."</p>
        <p>10239//04302019//13:14:22//"RISK elevated to HIGH."</p>
        <p>10239//04302019//13:14:14//"RISK lowered to LOW."</p>
        <p>10239//04302019//13:14:12/"Communication with node lost. Investigate further."</p>
        <p>10239//04302019//13:14:8//"LOW POWER. Battery at 4%. Plan for extraction."</p>
        <p>10239//04302019//13:14:7//"Node in extraction mode"</p>
        </div>
        )
    }
    else {
      return;
    }
  }

  analyticsPage(){
    return (
        <div>
        <Jumbotron className="App">
          <Navigation onChangePage={this.handleChangePage}/>
          <Container className="main-body">
            <Row className="maptable-toggle">
              <span>MAP</span>
              <Toggle
                defaultChecked = {this.state.displayTable}
                onChange = {this.handleToggleMapTable}
                icons={false}
              />
              <span>TABLE</span>
            </Row>
            <Row>
              {this.mapOrTable()}
            </Row>
            <Row  className="analytics-info">
              <Col xs={6}>
                <Row>
                  <ModeSelector
                    startVal = {this.state.startTime}
                    endVal = {this.state.endTime}
                    live = {this.state.live}
                    updating = {this.state.updating}
                    onChangeStart = {this.handleChangeStart}
                    onChangeEnd = {this.handleChangeEnd}
                    onChangeLive= {this.handleChangeLive}
                    onUpdate={this.handleUpdate}
                  />
                </Row>
                <Row className="analytics-status">
                  <Col xs={4}>
                    <Row>
                      <div className="node-status">
                        <h5>NODE STATUS</h5>
                        <h3 className={`${this.state.currentNodeStatus} node-level bold`}>{this.state.currentNodeStatus.toUpperCase()}</h3>
                        <div className={`${this.state.currentNodeStatus} node-indicator`}></div>
                      </div>
                    </Row>
                    <Row>
                      <div className="node-number">
                        <h5>NODE #</h5>
                        <h3 className="bold">000{this.state.currentNodeId}</h3>
                        <InfoContainer
                          nodeId={this.state.currentNodeId}
                          nodeData={this.state.currentNodeData}
                          nodePosition={this.state.currentLocation}
                          onMount={this.getNode}
                        />
                      </div>
                    </Row>
                  </Col>
                  <Col xs={8}>
                    <div className="systemwarning analytics-systemwarning">
                      <h3 className="bold">System Warnings</h3>
                      <div className="details">
                        {this.toggleSystemWarning()}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={6} className="chart">
                <Chart data={this.state.graph} chartRef={this.getChartRef} />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        {this.settingsPage()}
        </div>
        );
  }

  settingsPage(){
    return (
      <div className={`settings-sidebar ${this.state.pageSettings}`} onClick={this.handleSideBarClick}>
          <h3>Sam Lai</h3>
          <p>Add Node</p>
          <p>Notifications</p>
          <p>Logout</p>
          <small>Copyright 2019 emberNet. All rights reserved.</small>
      </div>
    );
  }

  render() {
    if(!this.state.loggedIn){
      return this.loginPage();
    } else{
      if(this.state.pageState === 'analytics'){
        return this.analyticsPage();
      } else{
        return this.dashboardPage();
      }
    }
  }
}

export default App;
