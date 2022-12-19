export interface User {
  name: string;
  surname: string;
  username: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
}

export interface UserReviewDTO { // Me
  user: number;
  movieId: number;
  comment: string;
}

