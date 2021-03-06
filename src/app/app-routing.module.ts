import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { CoividIndiaComponent } from './coivid-india/coivid-india.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:"faq", component:FaqComponent},
  {path:"covid-india" , component:CoividIndiaComponent},
  {path:"stats", component:StatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
