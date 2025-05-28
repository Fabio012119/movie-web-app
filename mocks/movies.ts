import type { TmdbMovie } from "@/types/general";

export const mockMovies: TmdbMovie[] = [
  {
    id: 1,
    title: "Inception",
    overview: "A mind-bending thriller",
    poster_path: "/inception.jpg",
    backdrop_path: "/inception-bg.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 20000,
    popularity: 100,
    original_language: "en",
    genre_ids: [28, 878],
    progress: 50,
    runtime: 148,
  },
  {
    id: 2,
    title: "The Matrix",
    overview: "The world is a simulation",
    poster_path: "/matrix.jpg",
    backdrop_path: "/matrix-bg.jpg",
    release_date: "1999-03-31",
    vote_average: 8.7,
    vote_count: 18000,
    popularity: 95,
    original_language: "en",
    genre_ids: [28, 878],
    progress: 80,
    runtime: 136,
  },
];

export const actionMovies: TmdbMovie[] = [
  {
    id: 101,
    title: "Die Hard",
    overview: "",
    poster_path: null,
    backdrop_path: null,
    release_date: "",
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    original_language: "en",
    genre_ids: [],
    progress: 0,
    runtime: 0,
  },
];

export const comedyMovies: TmdbMovie[] = [
  {
    id: 102,
    title: "The Mask",
    overview: "",
    poster_path: null,
    backdrop_path: null,
    release_date: "",
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    original_language: "en",
    genre_ids: [],
    progress: 0,
    runtime: 0,
  },
];

export const mockMovieWIthAllValues: TmdbMovie = {
  id: 42,
  title: "Inception",
  overview: "A dream within a dream.",
  poster_path: "/inception.jpg",
  backdrop_path: null,
  release_date: "2010-07-16",
  vote_average: 8.8,
  vote_count: 20000,
  popularity: 150.0,
  original_language: "en",
  genre_ids: [28, 878],
  progress: 0,
  runtime: 148,
};
