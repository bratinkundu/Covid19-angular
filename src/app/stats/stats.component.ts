import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private httpclient:HttpClient) { }

  data = []
  datefield = []
  ngOnInit(): void {
    this.getCumulativeData()
  }

  getCumulativeData()
  {
    this.httpclient.get('https://api.covid19india.org/data.json').subscribe(
      data => {
          console.log(data["cases_time_series"][0])
      }
    )
  }
  

}
