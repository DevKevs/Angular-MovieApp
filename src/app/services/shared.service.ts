import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  Movie: any;
  constructor() { }

  setData(data: any){
    this.Movie = data;
  }
  getData(){
    return this.Movie;
  }
}
