(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,a){},113:function(e,t,a){},114:function(e,t,a){},206:function(e,t,a){},224:function(e,t,a){},225:function(e,t,a){"use strict";a.r(t);a(77),a(78);var n=a(0),r=a.n(n),l=a(19),o=a.n(l),s=(a(84),a(75)),i=a(12),c=a.n(i),u=a(18),d=a(7),p=a(8),m=a(10),h=a(9),g=a(11),v=a(5),b=(a(87),a(227)),E=a(231),f=a(226),y=a(228),C=(a(88),a(232)),N=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleSelect=a.handleSelect.bind(Object(v.a)(Object(v.a)(a))),a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"handleSelect",value:function(e,t){this.props.onChangePage(e)}},{key:"render",value:function(){return r.a.createElement(f.a,null,r.a.createElement(C.a,{onSelect:this.handleSelect,fill:!0},r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,null,r.a.createElement("img",{src:"logo.png",height:"100",className:"d-inline-block align-top",alt:"embernet logo"}))),r.a.createElement(C.a.Item,null),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"dashboard",className:"navigation active"},"DASHBOARD")),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"analytics",className:"navigation"},"ANALYTICS")),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"settings",className:"navigation"},"SETTINGS"))))}}]),t}(r.a.Component),k=(a(95),a(37)),O=a(25),S=a.n(O),j="AIzaSyDneFI94si2xido5kCZjoGlm42q2Uhuf7s";S.a.setApiKey(j);var w=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleMarkerClick=function(e,t,n){a.setState({selectedPlace:e,activeMarker:t}),console.log(e,t,n),a.props.onMarkerClick(e)},a.state={center_location:{lat:49.904,lng:-121.077},activeMarker:{},selectedPlace:{}},a.props.center_location&&(a.state.center_location=a.props.center_location),a.props.onMount(),a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"renderMarkers",value:function(){var e=this,t=[];return this.props.markers.forEach(function(a){var n={lat:a.lat,lng:a.lng};t.push(r.a.createElement(k.Marker,{key:a.id,id:a.id,position:n,data:a,onClick:e.handleMarkerClick}))}),t}},{key:"render",value:function(){return r.a.createElement(k.Map,{google:this.props.google,initialCenter:this.state.center_location,zoom:6},this.renderMarkers())}}]),t}(r.a.Component),T=Object(k.GoogleApiWrapper)({apiKey:j})(w),D=(a(112),a(71)),I=a.n(D);S.a.setApiKey("AIzaSyDneFI94si2xido5kCZjoGlm42q2Uhuf7s");var R=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).getLocationName=function(e){S.a.fromLatLng(e.lat,e.lng).then(function(e){var t=e.results[10].formatted_address;a.setState({location:t})},function(e){console.log(e)})},a.state={nodeId:"",position:{lat:null,lng:null},location:"",data:{temperature:null,temperature_analog:null,pressure:null,humidity:null,eco2:null,tvoc:null,lightning_distance:null,created_at:null}},a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(e,t){e.nodeId!==this.props.nodeId&&(this.props.onMount(),this.setState({nodeId:this.props.nodeId,position:this.props.nodePosition,data:{temperature:null,temperature_analog:null,pressure:null,humidity:null,eco2:null,tvoc:null,lightning_distance:null,created_at:null}}),this.getLocationName(this.props.nodePosition)),e.nodeData!==this.props.nodeData&&this.setState({data:this.props.nodeData})}},{key:"render",value:function(){var e,t,a,n,l,o,s,i;return this.state.data.created_at&&(e=r.a.createElement("p",null,"Last Updated:  ",r.a.createElement(I.a,null,this.state.data.created_at))),this.state.data.temperature&&(t=r.a.createElement("p",null,"Temperature: ",this.state.data.temperature,"\xb0C")),this.state.data.temperature_analog&&(a=r.a.createElement("p",null,"Temperature Analog: ",this.state.data.temperature_analog,"\xb0C")),this.state.data.pressure&&(n=r.a.createElement("p",null,"Pressure: ",this.state.data.pressure," hPa")),this.state.data.humidity&&(l=r.a.createElement("p",null,"Humidity: ",this.state.data.humidity,"%")),this.state.data.eco2&&(o=r.a.createElement("p",null,"eCO2: ",this.state.data.eco2," ppm")),this.state.data.tvoc&&(s=r.a.createElement("p",null,"TVOC: ",this.state.data.tvoc," ppb")),this.state.data.lightning_distance&&(i=r.a.createElement("p",null,"Lightning Distance: ",this.state.data.lightning_distance,"m")),r.a.createElement("div",{className:"info-container"},r.a.createElement("p",null,this.state.location),r.a.createElement("p",null,"Lat: ",this.state.position.lat),r.a.createElement("p",null,"Lng: ",this.state.position.lng),r.a.createElement("h5",null,"Current Data"),e,t,a,n,l,o,s,i)}}]),t}(r.a.Component),_=(a(113),a(72)),L=a.n(_),A=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).responseGoogle=function(e){a.setState({loggedIn:!0}),console.log(e),console.log("Success"),a.props.onChangeLogin(a.state.loggedIn,e.accessToken)},a.responseFail=function(e){console.log(e),console.log("Failed")},a.state={loggedIn:!1},a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(b.a,{className:"login"},r.a.createElement(y.a,null,r.a.createElement(L.a,{clientId:"1082753030684-esf02ot6g648m6slcmf2n3j8np778j91.apps.googleusercontent.com",buttonText:"Login",onSuccess:this.responseGoogle,onFailure:this.responseFail,scope:"https://www.googleapis.com/auth/datastore"})))}}]),t}(r.a.Component),x=(a(114),a(73)),P={responsive:!0,maintainAspectRatio:!1,animation:{duration:500},scales:{xAxes:[{gridLines:{display:!1},type:"time",distribution:"linear",scaleLabel:{display:!0,labelString:"Time"}}],yAxes:[{id:"Temperature",position:"left",gridLines:{display:!1},scaleLabel:{display:!0,labelString:"Temperature"}},{id:"Pressure",position:"right",gridLines:{display:!1},scaleLabel:{display:!0,labelString:"Pressure"}}]}},H={datasets:[{spanGaps:!1,showLine:!0,label:"Temperature",yAxisID:"Temperature",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:[]},{spanGaps:!1,showLine:!0,label:"Pressure",yAxisID:"Pressure",fill:!0,lineTension:.1,backgroundColor:"rgba(192,86,75,0.4)",borderColor:"rgba(192,86,75,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(192,86,75,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(192,86,75,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:[]},{spanGaps:!1,showLine:!0,label:"Humidity%",yAxisID:"Humidity",fill:!0,lineTension:.1,backgroundColor:"rgba(192,86,75,0.4)",borderColor:"rgba(192,86,75,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(192,86,75,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(192,86,75,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:[]}]},M=function(){return{query:{kind:[{name:"Node"}]}}},V=function(e){return{query:{filter:{compositeFilter:{filters:[{propertyFilter:{op:"EQUAL",property:{name:"node_id"},value:{integerValue:e.currentNodeId}}}],op:"AND"}},kind:[{name:"EnvironmentalData"}],order:[{direction:"DESCENDING",property:{name:"created_at"}}],limit:1}}},B=function(e){return e.live?{query:{filter:{compositeFilter:{filters:[{propertyFilter:{op:"GREATER_THAN_OR_EQUAL",property:{name:"created_at"},value:{stringValue:e.startTime.toISOString()}}},{propertyFilter:{op:"EQUAL",property:{name:"node_id"},value:{integerValue:e.currentNodeId}}}],op:"AND"}},kind:[{name:"EnvironmentalData"}]}}:{query:{filter:{compositeFilter:{filters:[{propertyFilter:{op:"GREATER_THAN_OR_EQUAL",property:{name:"created_at"},value:{stringValue:e.startTime.toISOString()}}},{propertyFilter:{op:"LESS_THAN_OR_EQUAL",property:{name:"created_at"},value:{stringValue:e.endTime.toISOString()}}},{propertyFilter:{op:"EQUAL",property:{name:"node_id"},value:{stringValue:e.currentNodeId}}}],op:"AND"}},kind:[{name:"EnvironmentalData"}]}}},U=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).shouldComponentUpdate=function(e){return a.props.data!==e.data},a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(x.a,{data:this.props.data,options:P,ref:function(t){return e.props.chartRef(t)}})}}]),t}(r.a.Component),F=a(13),W=a.n(F),G=(a(206),a(229)),J=a(35),K=a.n(J),Y=(a(65),a(48)),q={Today:W()(),Yesterday:W()().subtract(1,"days")},Q=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(b.a,{className:"dayrange"},r.a.createElement(y.a,null,r.a.createElement(Y.DatetimePickerTrigger,{className:"input is-rounded is-small",shortcuts:q,moment:this.props.startVal,onChange:this.props.onChangeStart},r.a.createElement("input",{type:"text",value:this.props.startVal.format("YYYY-MM-DD HH:mm"),readOnly:!0}))),r.a.createElement(y.a,null,r.a.createElement(Y.DatetimePickerTrigger,{className:"input is-rounded is-small",shortcuts:q,moment:this.props.endVal,onChange:this.props.onChangeEnd,disabled:null===this.props.endVal},r.a.createElement("input",{type:"text",value:null===this.props.endVal?"Current":this.props.endVal.format("YYYY-MM-DD HH:mm"),readOnly:!0,disabled:null===this.props.endVal}))),r.a.createElement(y.a,{className:"modeselector-toggle"},r.a.createElement(K.a,{defaultChecked:this.props.live,onChange:this.props.onChangeLive})),r.a.createElement(y.a,null,r.a.createElement(G.a,{disabled:this.props.updating,variant:"dark",onClick:this.props.onUpdate},"Update")))}}]),t}(r.a.Component),z=(a(224),a(230)),Z=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleClick=function(e){e.preventDefault();var t=JSON.parse(e.currentTarget.dataset.node);a.props.onRowClick(t)},a.props.onMount(),a.renderRows=a.renderRows.bind(Object(v.a)(Object(v.a)(a))),a.handleClick=a.handleClick.bind(Object(v.a)(Object(v.a)(a))),a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"renderRows",value:function(){var e=this,t=[];return this.props.rows.forEach(function(a){t.push(r.a.createElement("tr",{key:a.id,onClick:e.handleClick,"data-node":JSON.stringify(a)},r.a.createElement("td",null,a.id),r.a.createElement("td",null,a.lat),r.a.createElement("td",null,a.lng),r.a.createElement("td",null,a.status.toUpperCase()),r.a.createElement("td",null,a.system_warning.toUpperCase())))}),t}},{key:"render",value:function(){return r.a.createElement(z.a,{responsive:!0,className:"table-container"},r.a.createElement("thead",null,r.a.createElement("th",null,"NODE #"),r.a.createElement("th",null,"LONGITUDE"),r.a.createElement("th",null,"LATITUDE"),r.a.createElement("th",null,"STATUS"),r.a.createElement("th",null,"SYSTEM WARNING")),r.a.createElement("tbody",null,this.renderRows()))}}]),t}(r.a.Component),$={temperature:"doubleValue",temperature_analog:"doubleValue",pressure:"doubleValue",humidity:"doubleValue",eco2:"integerValue",tvoc:"integerValue",lightning_distance:"integerValue"},X=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleLogin=function(e,t){a.setState({loggedIn:e}),a.token=t},a.handleChangeStart=function(e){a.setState({startTime:e})},a.handleChangeEnd=function(e){a.setState({endTime:e})},a.handleChangeLive=function(e){e.target.checked?(a.setState({live:!0,endTime:null}),a.intervalHandler()):(clearTimeout(a.timeout),a.setState({live:!1}),a.handleChangeEnd(W()()))},a.handleMarkerClick=function(e){var t=e.data;a.setState({currentNodeId:t.id,currentLocation:{lat:t.lat,lng:t.lng},currentNodeStatus:t.status})},a.handleRowClick=function(e){a.setState({currentNodeId:e.id,currentLocation:{lat:e.lat,lng:e.lng},currentNodeStatus:e.status})},a.intervalHandler=Object(u.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.getData();case 2:console.log("get data done, resetting"),a.state.live&&(a.timeout=setTimeout(a.intervalHandler,2e3));case 4:case"end":return e.stop()}},e)})),a.getAllNodes=Object(u.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=M(),null!==a.lastCursor&&(t.query.startCursor=a.lastCursor),e.next=4,fetch("https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json",{method:"POST",headers:{Authorization:"Bearer ".concat(a.token),Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json().then(function(e){try{if("entityResults"in e.batch){null===a.lastCursor?a.vals=[]:a.vals=a.vals.slice();var t=[];e.batch.entityResults.forEach(function(e){t.push({id:e.entity.properties.node_id.integerValue,lng:e.entity.properties.position.geoPointValue.longitude,lat:e.entity.properties.position.geoPointValue.latitude,status:e.entity.properties.status.stringValue,system_warning:e.entity.properties.system_warning.stringValue})}),a.setState({nodes:t})}else a.vals=[];if("NOT_FINISHED"===e.batch.moreResults)return console.log("Not done"),a.lastCursor=e.batch.endCursor,a.getAllNodes()}catch(n){console.log(n)}return a.lastCursor=null,!0})});case 4:case"end":return e.stop()}},e)})),a.getNode=Object(u.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=V(a.state),null!==a.lastCursor&&(t.query.startCursor=a.lastCursor),e.next=4,fetch("https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json",{method:"POST",headers:{Authorization:"Bearer ".concat(a.token),Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json().then(function(e){try{if("entityResults"in e.batch){null===a.lastCursor?a.vals=[]:a.vals=a.vals.slice();var t=e.batch.entityResults[0].entity.properties;a.setState({currentNodeData:{temperature:t.temperature?t.temperature[$.temperature]:null,temperature_analog:t.temperature_analog?t.temperature_analog[$.temperature_analog]:null,pressure:t.pressure?t.pressure[$.pressure]:null,humidity:t.humidity?t.humidity[$.humidity]:null,eco2:t.eco2?t.eco2[$.eco2]:null,tvoc:t.tvoc?t.tvoc[$.tvoc]:null,lightning_distance:t.lightning_distance?t.lightning_distance[$.lightning_distance]:null,created_at:t.created_at.stringValue}})}else a.vals=[];if("NOT_FINISHED"===e.batch.moreResults)return console.log("Not done"),a.lastCursor=e.batch.endCursor,a.getNode()}catch(n){console.log(n)}return a.lastCursor=null,!0})});case 4:case"end":return e.stop()}},e)})),a.getDataHandler=function(){var e=Object(u.a)(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("run data handler"),n=B(a.state),console.log(n),null!==a.lastCursor&&(n.query.startCursor=a.lastCursor),e.next=6,fetch("https://datastore.googleapis.com/v1/projects/embernet-api:runQuery?prettyPrint=true&alt=json",{method:"POST",headers:{Authorization:"Bearer ".concat(a.token),Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(e){return e.json().then(function(e){try{if(console.log(e),"entityResults"in e.batch?(console.log(e.batch),null===a.lastCursor?a.vals=[]:a.vals=a.vals.slice(),e.batch.entityResults.forEach(function(e){console.log(e);var n={};n.y=parseFloat(e.entity.properties[t][$[t]]),n.x=W()(e.entity.properties.created_at.stringValue),a.vals.length>0&&n.x.unix()-W()(a.vals[a.vals.length-1].x).unix()>600&&a.vals.push({y:NaN,x:n.x}),a.vals.push(n)})):a.vals=[],"NOT_FINISHED"===e.batch.moreResults)return console.log("Not done"),a.lastCursor=e.batch.endCursor,a.DataHandler(t)}catch(n){console.log(n)}return console.log(a.vals),console.log("Done"),a.lastCursor=null,!0})});case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.getData=Object(u.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("run get data"),a.setState({updating:!0}),t=Object(s.a)(a.state.graph.datasets),null===a.chartRef||!0===a.chartRef.props.data.datasets[0]._meta[0].hidden){e.next=7;break}return e.next=6,a.getDataHandler("temperature");case 6:t[0].data=a.vals;case 7:if(null===a.chartRef||!0===a.chartRef.props.data.datasets[1]._meta[0].hidden){e.next=11;break}return e.next=10,a.getDataHandler("pressure");case 10:t[1].data=a.vals;case 11:if(null===a.chartRef||!0===a.chartRef.props.data.datasets[2]._meta[0].hidden){e.next=15;break}return e.next=14,a.getDataHandler("humidity");case 14:t[2].data=a.vals;case 15:a.setState({graph:{datasets:t},updating:!1});case 16:case"end":return e.stop()}},e)})),a.getChartRef=function(e){null===a.chartRef&&null!==e&&(a.chartRef=e)},a.handleChangePage=function(e){"settings"===e?a.setState({pageSettings:""}):a.setState({pageState:e})},a.handleSideBarClick=function(e){e.preventDefault(),a.setState({pageSettings:"hidden"})},a.handleUpdate=function(){var e=Object(u.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,a.getData();case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.lastCursor=null,a.vals=[],a.chartRef=null,a.state={startTime:W()(),endTime:W()(),live:!1,graph:H,updating:!1,infoOn:!0,nodes:[],loggedIn:!1,currentNodeId:null,currentLocation:{},currentNodeData:{},currentNodeStatus:"",pageState:"analytics",pageSettings:"hidden",displayTable:!1},a.handleChangePage=a.handleChangePage.bind(Object(v.a)(Object(v.a)(a))),a.handleLogin=a.handleLogin.bind(Object(v.a)(Object(v.a)(a))),a.handleUpdate=a.handleUpdate.bind(Object(v.a)(Object(v.a)(a))),a.handleRowClick=a.handleRowClick.bind(Object(v.a)(Object(v.a)(a))),a.handleToggleMapTable=a.handleToggleMapTable.bind(Object(v.a)(Object(v.a)(a))),a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"handleToggleMapTable",value:function(){this.setState({displayTable:!this.state.displayTable})}},{key:"loginPage",value:function(){var e=r.a.createElement(b.a,{className:"d-inline-block align-top homepage-logo"},r.a.createElement("img",{src:"logo.png",height:"300",alt:"embernet logo"}));return r.a.createElement(E.a,{className:"App"},e,r.a.createElement(A,{onChangeLogin:this.handleLogin}))}},{key:"dashboardPage",value:function(){return r.a.createElement("div",null,r.a.createElement(E.a,{className:"App"},r.a.createElement(N,{onChangePage:this.handleChangePage}),r.a.createElement(f.a,{className:"main-body"},r.a.createElement(b.a,null,r.a.createElement(y.a,{xs:8,className:"map overview-map"},r.a.createElement(b.a,null,r.a.createElement(T,{markers:this.state.nodes,onMarkerClick:this.handleMarkerClick,onMount:this.getAllNodes})),r.a.createElement(b.a,null,r.a.createElement("div",{className:"overview-systemwarning systemwarning"},r.a.createElement("h3",{className:"bold"},"System Warnings"),r.a.createElement("div",{className:"details"},r.a.createElement("p",null,'10239//04302019//13:14:40//"Lightning Detected - 4 km away."'),r.a.createElement("p",null,'00281//04302019//13:14:30//"Lightning Detected - 12 km away."'),r.a.createElement("p",null,'10239//04302019//13:14:25//"Error Message."'),r.a.createElement("p",null,'10239//04302019//13:14:22//"RISK elevated to HIGH."'),r.a.createElement("p",null,'10239//04302019//13:14:14//"RISK lowered to LOW."'),r.a.createElement("p",null,'10239//04302019//13:14:12/"Communication with node lost. Investigate further."'),r.a.createElement("p",null,'10239//04302019//13:14:8//"LOW POWER. Battery at 4%. Plan for extraction."'),r.a.createElement("p",null,'10239//04302019//13:14:7//"Node in extraction mode"'))))),r.a.createElement(y.a,{xs:3,className:"overview"},r.a.createElement(b.a,{className:"overview-box"},r.a.createElement(y.a,{className:"bold overview-number"},"384"),r.a.createElement(y.a,{className:"overview-desc"},"Active Nodes")),r.a.createElement(b.a,{className:"overview-box"},r.a.createElement(y.a,{className:"bold overview-number"},"3"),r.a.createElement(y.a,{className:"overview-desc"},"Offline Nodes")),r.a.createElement(b.a,{className:"overview-box"},r.a.createElement(y.a,{className:"bold overview-number"},"24"),r.a.createElement(y.a,{className:"overview-desc"},"New Nodes")),r.a.createElement(b.a,{className:"overview-box"},r.a.createElement(y.a,{className:"bold overview-number"},"2"),r.a.createElement(y.a,{className:"overview-desc"},"Active Fires")),r.a.createElement(b.a,{className:"overview-box"},r.a.createElement(y.a,{className:"bold overview-number"},"5"),r.a.createElement(y.a,{className:"overview-desc"},"KM2 On Fire")))))),this.settingsPage())}},{key:"mapOrTable",value:function(){return this.state.displayTable?r.a.createElement(y.a,{xs:12,className:"overview-table"},r.a.createElement(Z,{rows:this.state.nodes,onRowClick:this.handleRowClick,onMount:this.getAllNodes})):r.a.createElement(y.a,{xs:12,className:"overview-map"},r.a.createElement(T,{markers:this.state.nodes,onMarkerClick:this.handleMarkerClick,onMount:this.getAllNodes}))}},{key:"toggleSystemWarning",value:function(){return this.state.currentNodeId?r.a.createElement("div",null,r.a.createElement("p",null,'10239//04302019//13:14:40//"Lightning Detected - 4 km away."'),r.a.createElement("p",null,'00281//04302019//13:14:30//"Lightning Detected - 12 km away."'),r.a.createElement("p",null,'10239//04302019//13:14:25//"Error Message."'),r.a.createElement("p",null,'10239//04302019//13:14:22//"RISK elevated to HIGH."'),r.a.createElement("p",null,'10239//04302019//13:14:14//"RISK lowered to LOW."'),r.a.createElement("p",null,'10239//04302019//13:14:12/"Communication with node lost. Investigate further."'),r.a.createElement("p",null,'10239//04302019//13:14:8//"LOW POWER. Battery at 4%. Plan for extraction."'),r.a.createElement("p",null,'10239//04302019//13:14:7//"Node in extraction mode"')):void 0}},{key:"analyticsPage",value:function(){return r.a.createElement("div",null,r.a.createElement(E.a,{className:"App"},r.a.createElement(N,{onChangePage:this.handleChangePage}),r.a.createElement(f.a,{className:"main-body"},r.a.createElement(b.a,{className:"maptable-toggle"},r.a.createElement("span",null,"MAP"),r.a.createElement(K.a,{defaultChecked:this.state.displayTable,onChange:this.handleToggleMapTable,icons:!1}),r.a.createElement("span",null,"TABLE")),r.a.createElement(b.a,null,this.mapOrTable()),r.a.createElement(b.a,{className:"analytics-info"},r.a.createElement(y.a,{xs:6},r.a.createElement(b.a,null,r.a.createElement(Q,{startVal:this.state.startTime,endVal:this.state.endTime,live:this.state.live,updating:this.state.updating,onChangeStart:this.handleChangeStart,onChangeEnd:this.handleChangeEnd,onChangeLive:this.handleChangeLive,onUpdate:this.handleUpdate})),r.a.createElement(b.a,{className:"analytics-status"},r.a.createElement(y.a,{xs:4},r.a.createElement(b.a,null,r.a.createElement("div",{className:"node-status"},r.a.createElement("h5",null,"NODE STATUS"),r.a.createElement("h3",{className:"".concat(this.state.currentNodeStatus," node-level bold")},this.state.currentNodeStatus.toUpperCase()),r.a.createElement("div",{className:"".concat(this.state.currentNodeStatus," node-indicator")}))),r.a.createElement(b.a,null,r.a.createElement("div",{className:"node-number"},r.a.createElement("h5",null,"NODE #"),r.a.createElement("h3",{className:"bold"},"000",this.state.currentNodeId),r.a.createElement(R,{nodeId:this.state.currentNodeId,nodeData:this.state.currentNodeData,nodePosition:this.state.currentLocation,onMount:this.getNode})))),r.a.createElement(y.a,{xs:8},r.a.createElement("div",{className:"systemwarning analytics-systemwarning"},r.a.createElement("h3",{className:"bold"},"System Warnings"),r.a.createElement("div",{className:"details"},this.toggleSystemWarning()))))),r.a.createElement(y.a,{xs:6,className:"chart"},r.a.createElement(U,{data:this.state.graph,chartRef:this.getChartRef}))))),this.settingsPage())}},{key:"settingsPage",value:function(){return r.a.createElement("div",{className:"settings-sidebar ".concat(this.state.pageSettings),onClick:this.handleSideBarClick},r.a.createElement("h3",null,"Jane Smith"),r.a.createElement("p",null,"Add Node"),r.a.createElement("p",null,"Notifications"),r.a.createElement("p",null,"Logout"),r.a.createElement("small",null,"Copyright 2019 emberNet. All rights reserved."))}},{key:"render",value:function(){return this.state.loggedIn?"analytics"===this.state.pageState?this.analyticsPage():this.dashboardPage():this.loginPage()}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},76:function(e,t,a){e.exports=a(225)},84:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},95:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.4d3a0de5.chunk.js.map