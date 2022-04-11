import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {

  Movie: any ={
    'duration': "",
    'gender': "",
    'hola': "",
    'id': 0,
    'name': "",
    'photo': "",
    'releaseDate': "",
    'sinopsis': "",
    'ticketPrice': ""
  }
  MovieId: any;
  seats: any = {
    "seatCode": "",
    "isAvailable": "",
    "roomNumber": 1,
    "id": 1,
    "hola": ""
  };
  Selectedschedule: any = "...";
  selectedSeat: any = "0";
  AvalibleSeats: any;
  user:any;
  userdata: any;
  ticketCode: any = "Blt";
  result: any;
  ok = false;
  constructor( private route: ActivatedRoute, private http: HttpClient, private NavTo: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      console.log(params)
      this.MovieId = params.data;
      console.log(this.MovieId)
    })
    this.GetMovies()
    this.GetSeats()
    this.GetFreeSeats()
    this.storageData()
    this.ticketCode += this.randomNumber(1000, 10000)
    console.log(this.ticketCode)
  }
  GetMovies(){
    var url = "https://localhost:7297/api/Movies/" + this.MovieId
    this.http.get(url).subscribe(obj => {
      this.Movie = obj
    })
  }
  GetSeats(){
    var url = "https://localhost:7297/api/Seats"
    this.http.get(url).subscribe(obj => {
      this.seats = obj
    })
  }
  GetFreeSeats(){
    var url = "https://localhost:7297/api/Seats/availableSeats"
    this.http.get(url).subscribe(obj => {
      this.AvalibleSeats = obj
    })
  }
  goLogin(){
    this.NavTo.navigate(['login'])
  }
  storageData(){
    this.userdata = sessionStorage.getItem('MyUser')
    this.user = JSON.parse(this.userdata)
    console.log(this.user)
  }
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  payTicket(){
    this.ticketCode += this.randomNumber(1000, 10000)
    const requestBody = {
      ticketCode: this.ticketCode,
      isAlreadyPrinted: false,
      movieName: this.Movie.name,
      seat:  this.selectedSeat,
      schedule: this.Selectedschedule,
      ticketPrice: this.Movie.ticketPrice,
      userId: this.user.id
    }
    this.http.post('https://localhost:7297/api/Ticket', requestBody).subscribe(obj => {
      this.result = obj
      this.fillSeat()
      this.ok = true;
    });
    console.log(requestBody)
  }
  fillSeat(){
    let url = "https://localhost:7297/api/Seats/"+this.selectedSeat+"/availability"
    this.http.put(url, url).subscribe(obj => {
      this.result = obj
       this.GetSeats()
    });
  }
  setFalse(){
    this.ok = false;
  }
}
