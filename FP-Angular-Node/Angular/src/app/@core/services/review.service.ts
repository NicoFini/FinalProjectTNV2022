import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserReviewDTO } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private router: Router, private http: HttpClient) { }

  review(reviewData: UserReviewDTO) {

    return this.http.post(`http://localhost:5188/Comments/Create_New`, reviewData); // LEOOO
  }

  

  isAuthenticated() {
    return !!localStorage.getItem("review");
  }
}
