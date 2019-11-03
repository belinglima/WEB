
import React, { Component } from "react";

import ReactApexChart from "react-apexcharts";

class Outro extends Component {

    constructor(props) {
        super(props);

        this.state = {
          options: {
            plotOptions: {
            bar: {
              barHeight: '100%',
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: 'bottom'
              },
            }
          },
          colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
          ],
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
              colors: ['#000']
            },
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
            dropShadow: {
              enabled: false
            }
          },

          stroke: {
            width: 1,
            colors: ['#fff']
          },
          xaxis: {
            categories: [
                'Pizza Doce', 
                'Pizza Salgada', 
                'Coca Lata', 
                'Vinho do Porto', 
                'Porção de Fritas', 
                'Cerveja Latao Skoll', 
                'Pizza Calabresa',
                'Pizza Aleo e Oleo', 
                'Porção de Empanados', 
                'Cerveja Skol 600',
                'Porção de Fritas', 
                'Cerveja Latao Skoll', 
                'Pizza Calabresa',
                'Pizza Aleo e Oleo', 
                'Porção de Empanados'
            ],
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          title: {
              text: 'Os 15 Produtos mais vendidos',
              align: 'left',
              floating: true
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: true
            },
            y: {
              title: {
                formatter: function () {
                  return ''
                }
              }
            }
          }
          },
          series: [{
            data: [20, 40, 48, 70, 80, 88, 90, 95, 100, 102, 103, 104, 110, 120, 138]
          }],
        }
      }


  render() {
    return (
        <div id="chart">
            <ReactApexChart 
                options={this.state.options} 
                series={this.state.series} 
                type="bar" height="370" 
            />
      </div>
      
    )
  }
}

export default Outro;