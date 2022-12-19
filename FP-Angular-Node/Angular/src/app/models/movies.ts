export interface MovieService{
    id:number;
    name:string;
    genres:[];
    original_language:string;
    spoken_languages:[];
    budget:number;
    revenue:number;
    status:string;
    release_date:string;
    runtime:number;

}

export interface Genre {
    id: number;
    name: string;
  }

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }

export interface MovieData {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }