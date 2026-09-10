import { FilmPosters } from '@/constants/film-posters';

export const getFilmImage = (episodeId: number) => {
  return FilmPosters[episodeId];
}
