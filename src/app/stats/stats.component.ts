import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit,AfterViewInit {

  constructor(private httpclient:HttpClient) { 
    this.getCumulativeData()  
    if(this.clicked)
    {
      console.log("clicked")
    }
  }
  
  labeldata = new Array();
  confirmeddata = new Array();
  recovereddata = new Array();
  deathdata = new Array();
  dailyconfirmeddata = new Array();
  dailyrecovereddata = new Array();
  dailydeadthdata = new Array();
  chart;
  chart1;
  clicked = true
 
  
  ngOnInit(): void {

    console.log('oninit')
  }

  ngAfterViewInit() :void{
  
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
    for(let i=31 ;i < Object.keys(data["cases_time_series"]).length;i++)
    {
       this.confirmeddata.push(data["cases_time_series"][i]['totalconfirmed'])
       this.labeldata.push(data["cases_time_series"][i]['date'])
       this.recovereddata.push(data["cases_time_series"][i]['totalrecovered'])
       this.deathdata.push(data["cases_time_series"][i]['totaldeceased'])
       this.dailyconfirmeddata.push(data["cases_time_series"][i]['dailyconfirmed'])
       this.dailyrecovereddata.push(data["cases_time_series"][i]['dailyrecovered'])
       this.dailydeadthdata.push(data["cases_time_series"][i]['dailydeceased'])
    }
  }
  
  generateTotalsChart(){
    this.chart = new Chart('canvas',{
      type: 'line',
      data: {
        labels: this.labeldata, // your labels array
        datasets: [
          {
            label:"Confimed Cases: ",
            data: this.confirmeddata, // your data array
            backgroundColor: '#fff',
            borderColor: 'rgba(234, 11, 11, 1)',
            pointBackgroundColor: 'rgba(234, 11, 11, 1)',
            pointBorderColor: 'rgba(234, 11, 11, 1)',
            pointHoverBackgroundColor: 'rgba(234, 11, 11, 1)',
            pointHoverBorderColor: 'rgba(234, 11, 11, 1)',
            fill:true,
            pointRadius:0.4,
          },
          {
            label:"Recovered Cases: ",
            data: this.recovereddata, // your data array
            backgroundColor: '#fff',
            borderColor: 'rgba(2, 182, 23, 1)',
            pointBackgroundColor: 'rgba(2, 182, 23, 1)',
            pointBorderColor: 'rgba(2, 182, 23, 1)',
            pointHoverBackgroundColor: 'rgba(2, 182, 23, 1)',
            pointHoverBorderColor: 'rgba(2, 182, 23, 1)',
            fill:true,
            pointRadius:0.4,
          },
          {
            label:"Deaths: ",
            data: this.deathdata, // your data array
            backgroundColor: '#fff',
            borderColor: 'rgb(103, 58, 183)',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: 'rgb(103, 58, 183)',
            pointHoverBackgroundColor: 'rgb(103, 58, 183)',
            pointHoverBorderColor: 'rgb(103, 58, 183)',
            fill:true,
            pointRadius:0.4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        title:{
          display:true,
          text:'Total Cases in India',
          fontSize: 20,
        },
        tooltips:{
          mode:'index',
          intersect:false,
          position:'average',
        },
        hover: {
          intersect: false,
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time:{
              unit: 'day',
              tooltipFormat: 'MMM DD',
              stepSize: 7,
            },
            gridLines:{
              drawOnChartArea:false,
            },
            display: true
          }],
          yAxes: [{
            type:'linear',
            ticks: {
              beginAtZero: true,
              max: undefined,
            },
            gridLines:{
              drawOnChartArea:false,
            },
            display: true
          }],
        },
      }
    });
  
  }


  generateDailyChart(){
    this.chart1 = new Chart('canvas1',{
      type: 'line',
      data: {
        labels: this.labeldata, // your labels array
        datasets: [
          {
            label:"Daily Cases: ",
            data: this.dailyconfirmeddata, // your data array
            backgroundColor: 'rgba(103, 58, 183, .1)',
            borderColor: 'rgb(103, 58, 183)',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(103, 58, 183, .8)',
            fill:true,
          },
          {
            label:"Confirmed Cases: ",
            data: this.confirmeddata, // your data array
            backgroundColor: 'rgba(103, 58, 183, .1)',
            borderColor: 'red',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(103, 58, 183, .8)',
            fill:true,
          },

        ]
      },
      
      options: {
        responsive: true,
        maintainAspectRatio:false,
        title:{
          display:true,
          text:'Daily increase of Confirmed cases in India'
        },
        tooltips:{
          mode:'index',
        },
        hover: {
          mode: 'index',
          intersect: true
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
      }
    });
  
  }
}
