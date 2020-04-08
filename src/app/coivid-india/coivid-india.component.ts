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
  timestamp : string;
  stateTimestamp : string;
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

  getStateData(id:number, state:string)
  {
    this.httpclient.get('https://api.covid19india.org/data.json').subscribe(
      data => {
          this.specificStateData = data['statewise'][id]
          this.stateTimestamp = this.getTimeDifference(data['statewise'][id]['lastupdatedtime'])
          this.fatalityRate = ((data['statewise'][id]['deaths']/data['statewise'][id]['confirmed'])*100)
          this.fatalityRate = this.fatalityRate.toFixed(2)
          this.recoveryRate = ((data['statewise'][id]['recovered']/data['statewise'][id]['confirmed'])*100)
          this.recoveryRate = this.recoveryRate.toFixed(2)
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
    var d = new Date(date).toLocaleDateString().split('/')
    var d1 = [d[1],d[0],d[2]].join('/')
    var final = new Date(d1).toLocaleDateString("en-IN",{day:'numeric',month:'short'})
    var time = new Date(date).toLocaleTimeString('en-IN',{ hour: '2-digit', minute: '2-digit' })
    return final+", "+time+" IST"
  }

  hide()
  {
    this.showModal = false;
  }
}
