import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RatingDTO } from 'src/app/models/rating';


@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
    
  constructor(private router: Router, private http: HttpClient) {}
  

  getAllFavourites(userId: number | null){
    return this.http.get<RatingDTO>(`http://localhost:1234/api/favourite/${userId}}`);

  }

}
