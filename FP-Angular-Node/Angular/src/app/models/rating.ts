export interface RatingDTO  {
    movie_id: number | null,
    user_id: number | null,
    movie_rating: number,
    favourite: boolean,
    movie_title : string | undefined,
    score : number | null;
  }