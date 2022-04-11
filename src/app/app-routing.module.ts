import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MovieViewComponent } from './Components/movie-view/movie-view.component';
import { TicketsComponent } from './Components/tickets/tickets.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'MovieView',
    component: MovieViewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
