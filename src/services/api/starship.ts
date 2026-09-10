import type { Starship, StarshipAPIResponse } from '@/types/starship';

import { api } from './client';


export function getStarships() {

  const starshipsData = api<StarshipAPIResponse>('/starships');

  return starshipsData;
}

export function getStarshipsByPagination(pagination?: number) {
  const url = pagination ? `/starships/?page=${pagination}` : '/starships';

  const starshipsData = api<StarshipAPIResponse>(url);

  return starshipsData;
}

export function getStarship(id: string) {
  return api<Starship>(`/starships/${id}`);
}
