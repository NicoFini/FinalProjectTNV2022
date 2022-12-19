import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../@core/services/review.service';
import { MovieApiService } from '../@core/services/movies.service';
import { MovieData } from '../models/movies';
import { RatingService } from '../@core/services/rating.service';
import { RatingDTO } from '../models/rating';
import { AuthService } from "src/app/@core/services/auth.service";
import { UserReviewDTO } from '../models/user';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'tnv-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {

  constructor(private reviewService: ReviewService,
    private router: Router,
    public newMovieService: MovieApiService,
    private ratingService: RatingService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.reviewService.isAuthenticated()) {
      this.router.navigateByUrl("/start-game");
    }
  }

  time: number = 0;
  display: any; // any aggiunto da me
  interval: any; // any aggiunto da me
  isVisibleTimer: Boolean = false;
  isVisibleSubmit: Boolean = true;
  isVisibleLose: Boolean = true;
  isVisibleWin: Boolean = true;
  isvisibileRestart: Boolean = true;
  isVisibleTAWin: Boolean = false;
  checkWin: Boolean = false;
  user_id: any;
  movie_id: number = 0;
  rating: number = 0.0;
  comment: string = "default comment";
  id: any;
  movie_title : any;

  movieSpecs: MovieData | null = null;

  startTimer() {
    this.getIDbyUsername();
    let i: any;
    let j: any = Math.floor(Math.random() * 7);
    this.getMovie();
    for (i = 0; i < 8; i++) {
      if (i != j) {
        this.isVisibleButton[i] = false;
      }
      if (i === j) {
        this.isVisibleParam[i] = false;
      }
      this.isVisibleSubmit = false;
    }
    this.isvisibileRestart = false;
    this.interval = setInterval(() => {
      if (this.time >= 90) {
        this.pauseTimer();
        for (i = 0; i < 8; i++) {
          this.isVisibleButton[i] = true;
        }
        this.isVisibleSubmit = true;
        this.isVisibleLose = false;
        this.isVisibleTimer = true;
        this.isvisibileRestart = true;
      } else {
        this.time++;
      }
      this.display = this.transform(this.time)
      this.isVisibleTimer = true;
    }, 1000);
  }

  getIDbyUsername() {
    this.authService.getCurrentUsername().subscribe({
      next: (dato) => {
        //console.log("dato " + dato); //stampa il valore corretto preso da getCurrentUsername
        this.user_id = dato;
        //console.log("This.id " + this.id);
      },
      error: () => {
        return console.error('There was an error!');
      }
    });
    //console.log("ID " + this.user_id); //undefined 
    return this.user_id;
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  isVisibleButton: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean] = [true, true, true, true, true, true, true, true]
  isVisibleParam: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean] = [true, true, true, true, true, true, true, true]

  onClick(id: number) {
    this.isVisibleButton[id] = true;
    this.isVisibleParam[id] = false;
    this.time = this.time + 30;
  }

  restart() {
    let i: any;
    this.time = 0;
    this.pauseTimer();
    for (i = 0; i < 8; i++) {
      this.isVisibleParam[i] = true;
      this.isVisibleButton[i] = true;
    }
    this.isVisibleLose = true;
    this.isVisibleWin = true;
    this.startTimer();
  }

  getMovie() {
    let randomMovie: number = Math.floor(Math.random() * 800);
    //console.log(randomMovie);

    this.newMovieService.getMovieDetails(randomMovie).subscribe({
      next: (res) => {
        this.movieSpecs = res;
        if (this.movieSpecs === null ||
          this.movieSpecs.poster_path === null ||
          this.movieSpecs.tagline === null)
          this.getMovie();
        this.movie_id = this.movieSpecs.id;
        console.log(this.movieSpecs?.title);
      },
      error: () => {
        this.getMovie();
      },
    });
  }

  verifyResult(verifyForm: NgForm) {
    if (this.movieSpecs?.title.toLowerCase() === verifyForm.value.Title.toLowerCase()) {
      this.checkWin = true;
      console.log("Hai indovinato!");
      this.isVisibleWin = false;
      this.pauseTimer();

      let i: any;
      for (i = 0; i < 8; i++) {
        this.isVisibleButton[i] = true;
      }
      this.isvisibileRestart = true;
      this.isVisibleSubmit = true;
    }
    else {
      console.log("Ops...hai sbagliato :(" + this.movieSpecs?.title + " diverso da " + verifyForm.value.Title);
    }
  }

  starsClick() {
    this.isVisibleTAWin = true;
    let rating: number;
    this.movie_id;
  }

  getRatingStar(rating: number) {
    this.isVisibleTAWin = true;
    this.rating = rating;
  }


  userReview(commentBody: UserReviewDTO) {

    console.log(commentBody);

    /* BEST PRACTICE:
     this.reviewService.review(commentBody).pipe(tap((responce)=>console.log(responce)),
      switchMap(() =>
        this.ratingService.createRating(this.createBodyRating())
      )).subscribe({
        next: () => console.log('New rating created!'),
        error: () => console.log('Error!')
      });
  }*/
   
  this.reviewService.review(commentBody).subscribe({
     next: () => {
       this.router.navigateByUrl("/start-game")

       this.ratingService.createRating(this.createBodyRating()).subscribe({
         next: () => console.log('New rating created!'),
         error: () => console.log('Error!')
       });
     },
     error: () => alert('Qualcosa è andato storto')
   }); 
  }

  createBodyRating() {
    let ratingSpecs: RatingDTO = { user_id: this.user_id, movie_id: this.movie_id, movie_rating: this.rating, 
      favourite: true, movie_title : this.movieSpecs?.title, score : this.time };
    console.log("Ratings " + this.rating);
    return ratingSpecs;
  }

  createCommentBody(comment: string) {
    let ratingComment = {
      user: this.user_id,
      movieId: this.movie_id,
      comment: comment
    };
    return ratingComment;
  }

  createNewRating(form: NgForm) {
    console.log(form.value);
    let commentBody = this.createCommentBody(form.value.comment);
    this.userReview(commentBody);
  }

}
