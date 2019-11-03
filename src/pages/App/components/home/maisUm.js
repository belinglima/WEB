
import React, { Component } from "react";

import ReactApexChart from "react-apexcharts";

class MaisUm extends Component {

    constructor(props) {
        super(props);

        this.state = {
          options: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
          series: [44, 55, 13, 43, 22],
        }
      }


  render() {
    return (
        <div id="chart">
            <ReactApexChart 
                options={this.state.options} 
                series={this.state.series} 
                type="pie" height="370" 
            />
      </div>
      
    )
  }
}

export default MaisUm;