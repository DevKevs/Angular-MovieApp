import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'caribbean-app';

  user:any;
  userdata: any;
  constructor(private NavTo: Router) { }
  ngOnInit(): void {
    this.storageData()
  }

  storageData(){
    this.userdata = sessionStorage.getItem('MyUser')
    this.user = JSON.parse(this.userdata)
    console.log(this.user)
  }
  logOut(){
    sessionStorage.removeItem('MyUser')
    this.NavTo.navigate(['home'])
  }
}
