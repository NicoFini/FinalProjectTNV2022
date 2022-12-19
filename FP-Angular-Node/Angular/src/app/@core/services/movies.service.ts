import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieData} from 'src/app/models/movies';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  TMDBKey : string = "f4b38bb8ceedc8eb7a8599ea99cf42ff" ;
  TMDBUrlBase : string = "https://api.themoviedb.org/3/movie/";
  urlLocandina: string = "https://image.tmdb.org/t/p/original/"

  constructor(private httpClient: HttpClient) { }

  getMovieDetails(movieId: number | null){
    return this.httpClient.get<MovieData>(`${this.TMDBUrlBase}${movieId}?api_key=${this.TMDBKey}`);
  }



  getLocandina(posterPath: string | undefined){
    return `${this.urlLocandina}${posterPath}`;
  }

}