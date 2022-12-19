import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RatingDTO } from 'src/app/models/rating';

'http://localhost:1234/rating/';
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private router: Router, private http: HttpClient) { }

  createRating(ratingData: RatingDTO) {
    console.log(ratingData);
    //this.router.navigateByUrl("/rating");
    console.log("movie_ID " + ratingData.movie_id + "user_ID " + ratingData.user_id);
    return this.http.patch(`http://localhost:1234/api/rating/${ratingData.movie_id}/${ratingData.user_id}`, ratingData);
  }

  getIDbyUsername(){

  }
}
