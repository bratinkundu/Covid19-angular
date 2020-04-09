import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private httpclient:HttpClient) { }

  confirmeddata = new Array();
  labeldata = new Array();
  chart;
 
  
  ngOnInit(): void {
    this.getCumulativeData()
    this.generateChart()
  }


  getCumulativeData()
  {
    this.httpclient.get('https://api.covid19india.org/data.json').subscribe(
      data => {
        console.log(data["cases_time_series"][8]['totalconfirmed'])
        this.formatData(data)
      }
    )
  }
  formatData(data)
  {
    for(let i=0 ;i < Object.keys(data["cases_time_series"]).length;i++)
    {
       this.confirmeddata.push(data["cases_time_series"][i]['totalconfirmed'])
       this.labeldata.push(data["cases_time_series"][i]['date'])
    }
  }
  
  generateChart(){
    this.chart = new Chart('canvas',{
      type: 'line',
      data: {
        labels: this.labeldata, // your labels array
        datasets: [
          {
            label:"Confimed Cases: ",
            data: this.confirmeddata, // your data array
            backgroundColor: 'rgba(103, 58, 183, .1)',
            borderColor: 'rgb(103, 58, 183)',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(103, 58, 183, .8)',
            fill:true,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        title:{
          display:true,
          text:'Cummulative increase of Confirmed cases in India'
        },
        hover: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines:{
              drawOnChartArea:false,
            },
            display: true
          }],
          yAxes: [{
            gridLines:{
              drawOnChartArea:false,
            },
            display: true
          }],
        },
        onHover : function(etv,item)
        {
          //var item = this.getElementAtEvent(etv);
          if (item.length) {
            //console.log("onHover",item[0]["_item"], etv.type);
            //console.log(item[0]['_index'])
           return this.data.datasets[0].data[item[0]['_index']]
          //  console.log(item)
          //  console.log()
          }
        }
      }
    });
  
  }

}
