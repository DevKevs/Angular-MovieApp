import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  userdata: any;
  user: any;
  result: any;
  message: any;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.storageData()
  }

  login(){
    var user = {
      userName: this.username,
      password: this.password
    }
    this.http.post('https://localhost:7297/api/User/Login', user).subscribe(obj => {
      this.result = obj
      sessionStorage.setItem('MyUser', JSON.stringify(this.result))
      this.route.navigate(['home'])
    }, (error) => {
      this.message = "Algo salio mal";
    });

  }
  storageData(){
    this.userdata = sessionStorage.getItem('MyUser')
    this.user = JSON.parse(this.userdata)
    console.log(this.user)
  }

}
