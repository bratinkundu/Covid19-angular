import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coivid-india',
  templateUrl: './coivid-india.component.html',
  styleUrls: ['./coivid-india.component.css']
})
export class CoividIndiaComponent implements OnInit {

  constructor(private httpclient : HttpClient) { }

  showModal : boolean;
  indiaData;
  stateData = [];
  timestamp 
  stateTimestamp 
  searchText;
  specificStateData;
  districtData;
  fatalityRate;
  recoveryRate;

  ngOnInit(): void {
    this.getIndiaData();
  }

  getIndiaData(){
    this.httpclient.get('https://api.covid19india.org/data.json').subscribe(
      data => {
        this.indiaData = data['statewise'][0]
        this.timestamp = this.getTimeDifference(data['statewise'][0]['lastupdatedtime'])
        this.stateData = data['statewise']
        this.stateData.splice(0,1)
      }
    );
  }

  getStateData(statecode:string, state:string)
  {
    this.httpclient.get('https://api.covid19india.org/data.json').subscribe(
      data => {
        for(var i=0;i<Object.keys(data['statewise']).length;i++)
        {
          if(data['statewise'][i]['statecode'] == statecode)
          {
            this.specificStateData = data['statewise'][i]
            this.stateTimestamp = this.getTimeDifference(data['statewise'][i]['lastupdatedtime'])
            this.fatalityRate = ((data['statewise'][i]['deaths']/data['statewise'][i]['confirmed'])*100)
            this.fatalityRate = this.fatalityRate.toFixed(2)
            this.recoveryRate = ((data['statewise'][i]['recovered']/data['statewise'][i]['confirmed'])*100)
            this.recoveryRate = this.recoveryRate.toFixed(2)
          }
        }
      }
    );
    this.httpclient.get('https://api.covid19india.org/v2/state_district_wise.json').subscribe(
      data =>{
        this.getDistrictData(data,state)
      }
    )
    this.showModal = true;
  }

  getDistrictData(data,state:string)
  {
    for(let i=0;i<Object.keys(data).length;i++)
    {
      if(state == data[i]['state'])
      {
        this.districtData = data[i]['districtData']
        break;
      }
    }
  }
  

  getTimeDifference(date){
    var d = date.split('/')
    var d1 = [d[1],d[0],d[2]].join('/')
    var final = new Date(d1)
    return final 
  }

  hide()
  {
    this.showModal = false;
  }
}
