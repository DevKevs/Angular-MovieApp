import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  user:any;
  userdata: any;
  tickets: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.storageData()
    this.getTickets()
    console.log(this.tickets)
  }

  storageData(){
    this.userdata = sessionStorage.getItem('MyUser')
    this.user = JSON.parse(this.userdata)
    console.log(this.user)
  }
  getTickets(){
    var url = "https://localhost:7297/api/Ticket/"+this.user.id+"/user"
    this.http.get(url).subscribe(obj => {
      this.tickets = obj
    })
  }
}
