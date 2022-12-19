import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FavouriteService } from 'src/app/@core/services/favourites.service';
import { MovieApiService } from 'src/app/@core/services/movies.service';
import { RatingDTO } from 'src/app/models/rating';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MovieData } from 'src/app/models/movies';





@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  user_id : any;
  favourites : any;
  movie_id:any;
  
  


  //dataSource = new MatTableDataSource<RatingDTO>(this.favourites);
  movies : any;
  
  constructor(private router: Router, public movieApiService: MovieApiService, public authService: AuthService,
     public favouriteService: FavouriteService) { }
  
  ngOnInit(): void {
    this.authService.getCurrentUsername().subscribe({
        next: (dato) => {
          console.log("dato " + dato); //stampa il valore corretto preso da getCurrentUsername
          this.user_id = dato;
          //console.log("This.id " + this.user_id);
          this.favouriteService.getAllFavourites(this.user_id).subscribe({
            next: (response) => {
              console.log(response);
              this.favourites=response;}
   })
        },
        error: () => {
          return console.error('There was an error!');
         }
  })
  //this.posterMovie();

}
  posterMovie(){
    this.movies =this.movieApiService.getMovieDetails(this.favourites.movie_id);
    
    
  }
    

}
