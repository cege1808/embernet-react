export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration : 500,
    },
    scales : {
      xAxes: [{
        gridLines: {
          display: false,
        },
        type: 'time',
        distribution: 'linear', // Distances can vary, based on time
        scaleLabel: {
          display: true,
          labelString: 'Time'
        },
      }],
      yAxes: [{
        id: 'Temperature',
        position: 'left',
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Temperature'
        },
        },
        {
          id: 'Pressure',
          position: 'right',
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Pressure'
          },
        }
        // {
        //   id: 'Humidity ',
        //   position: 'right',
        //   gridLines: {
        //     display: false,
        //   },
        //   scaleLabel: {
        //     display: true,
        //     labelString: 'Humidity'
        //   },
        // }
    ]
    },
}

export const data = {
    datasets: [
        {
            spanGaps: false,
            showLine: true,
            label: 'Temperature',
            yAxisID: 'Temperature',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [] // Data to update
        },
        {
            spanGaps: false,
            showLine: true,
            label: 'Pressure',
            yAxisID: 'Pressure',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(192,86,75,0.4)',
            borderColor: 'rgba(192,86,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,86,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,86,75,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [] // Data to update
        }
        // {
        //     spanGaps: false,
        //     showLine: true,
        //     label: 'Humidity%',
        //     yAxisID: 'Humidity',
        //     fill: true,
        //     lineTension: 0.1,
        //     backgroundColor: 'rgba(192,86,75,0.4)',
        //     borderColor: 'rgba(192,86,75,1)',
        //     borderCapStyle: 'butt',
        //     borderDash: [],
        //     borderDashOffset: 0.0,
        //     borderJoinStyle: 'miter',
        //     pointBorderColor: 'rgba(192,86,75,1)',
        //     pointBackgroundColor: '#fff',
        //     pointBorderWidth: 1,
        //     pointHoverRadius: 5,
        //     pointHoverBackgroundColor: 'rgba(192,86,75,1)',
        //     pointHoverBorderColor: 'rgba(220,220,220,1)',
        //     pointHoverBorderWidth: 2,
        //     pointRadius: 1,
        //     pointHitRadius: 10,
        //     data: [] // Data to update
        // },
    ],
};

export const requestAllNodes = () => {
  return {
    query: {
      kind: [
        {name: 'Node'}
      ]
    }
  }
}

export const requestNode = (state) => {
  return {
    query: {
      filter: {
        compositeFilter: {
          filters: [
            {
              propertyFilter: {
                op: 'EQUAL',
                property: { name: 'node_id'},
                value: {integerValue: state.currentNodeId}
              }
            }
          ],
          op: "AND"
        }
      },
      kind: [
        {name: 'EnvironmentalData'}
      ],
      order: [
        {
            direction: 'DESCENDING',
            property: {name: 'created_at'}
        }
      ],
      limit: 1
    }
  }
}

export const requestEnvironmentalData = (state) => {
return (state.live) ? {
    query: {
        filter: {
            compositeFilter: {
                filters: [
                {
                    propertyFilter: {
                        op: 'GREATER_THAN_OR_EQUAL',
                        property: {
                            name: 'created_at'
                        },
                        value: {
                            stringValue: state.startTime.toISOString()
                        }
                    }
                },
                {
                    propertyFilter: {
                        op: 'EQUAL',
                        property: {
                            name: 'node_id'
                        },
                        value: {
                            integerValue: state.currentNodeId
                        }
                    }
                }
                ],
                op: "AND"
            }
        },
        kind: [
            {
                name: 'EnvironmentalData'
            }
        ],
    }
    } : {
    query: {
        filter: {
            compositeFilter: {
                filters: [
                {
                    propertyFilter: {
                        op: 'GREATER_THAN_OR_EQUAL',
                        property: {
                            name: 'created_at'
                        },
                        value: {
                            stringValue: state.startTime.toISOString()
                        }
                    }
                },
                {
                    propertyFilter: {
                        op: 'LESS_THAN_OR_EQUAL',
                        property: {
                            name: 'created_at'
                        },
                        value: {
                            stringValue: state.endTime.toISOString()
                        }
                    }
                },
                {
                    propertyFilter: {
                        op: 'EQUAL',
                        property: {
                            name: 'node_id'
                        },
                        value: {
                            stringValue: state.currentNodeId
                        }
                    }
                }
                ],
                op: "AND"
            }
        }
        ,
        kind: [
        {
            name: "EnvironmentalData"
        }
        ]

    }
}
};