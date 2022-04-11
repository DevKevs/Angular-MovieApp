import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Movies: any;
  Movie: any;
  search = "";
  gender: any = "All";
  notValid = false;
  constructor(private http: HttpClient, private route: Router) { }
  ngOnInit(): void {
    this.GetMovies()
  }

  GetMovies(){
    this.http.get('https://localhost:7297/api/Movies').subscribe(obj => {
      this.Movies = obj
    })
  }
  movieFilter(event: any){
    this.search = event.target.value
  }
  navToMovie(param: any){
    this.route.navigate(['MovieView'],{queryParams:{data: param.id}})
  }
  genderFilter(){
    if(this.gender == "All"){
      this.GetMovies()
    }
    else{
      var url = "https://localhost:7297/api/Movies/"+this.gender+"/gender"
      this.http.get(url).subscribe(obj => {
      this.Movies = obj
    })
    }
  }
}

