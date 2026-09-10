import type { Film, FilmAPIResponse } from '@/types/film';

import { api } from './client';


export function getFilms() {

  const filmsData = api<FilmAPIResponse>('/films');

  return filmsData;
}

export function getFilmsByPagination(pagination?: number) {
  const url = pagination ? `/films/?page=${pagination}` : '/films';

  const filmsData = api<FilmAPIResponse>(url);

  return filmsData;
}

export function getFilm(id: string) {
  return api<Film>(`/films/${id}`);
}
