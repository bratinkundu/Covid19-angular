import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public httpclient : HttpClient){}

  showModal : boolean;
  textConfirmed :string = "Confirmed"
  countryData : any;
  worldData;
  @Input() timestamp : string;
  specificCountry;
  countryTimestamp:string;
  fatalityRate;
  recoveryRate;
  searchText;

  ngOnInit(): void {
    this.getIntitalData();  
    this.getCountiesData();
  }


  private getTime(timestamp:number){
    var lastUpdated = new Date(timestamp);
    var currentTime = new Date().valueOf()
    var hours  = Math.floor((Math.abs(currentTime - timestamp)/1000)/3600) % 24; 
    var minutes = Math.floor((Math.abs(currentTime - timestamp)/1000)/60) % 60;
    console.log(lastUpdated)
    if(hours != 0){
      return hours+" hours ago!"
    }
    else if(minutes != 0){
      return minutes+" minutes ago!"
    }
    else{
      return "Just Now!"
    }
  }

  public getIntitalData(){
    this.httpclient.get('https://corona.lmao.ninja/v2/all').subscribe(
      data =>{
          this.worldData = data
          this.timestamp = this.getTime(data['updated']);
      }
    );
  }

  public getCountiesData(){
    this.httpclient.get('https://corona.lmao.ninja/v2/countries').subscribe(
      (data : any[]) =>{
            this.countryData = data;
      }
    );
  }

  public trclick(c:string){
    this.showModal = true;
    this.getCountryData(c);
  }

  hide()
  {
    this.showModal = false;
  }

  getCountryData(country){
    this.httpclient.get('https://corona.lmao.ninja/v2/countries/'+country).subscribe(
      (data:any[]) =>{
        this.specificCountry = data;
        this.countryTimestamp = this.getTime(data['updated'])
        this.fatalityRate = ((data['deaths']/data['cases'])*100)
        this.fatalityRate = this.fatalityRate.toFixed(2)
        this.recoveryRate = ((data['recovered']/data['cases'])*100)
        this.recoveryRate = this.recoveryRate.toFixed(2)
      }
    );
  }
}
