import type { Planet, PlanetAPIResponse } from '@/types/planet';

import { api } from './client';


export function getPlanets() {

  const planetsData = api<PlanetAPIResponse>('/planets');

  return planetsData;
}

export function getPlanetsByPagination(pagination?: number) {
  const url = pagination ? `/planets/?page=${pagination}` : '/planets';

  const planetsData = api<PlanetAPIResponse>(url);

  return planetsData;
}

export function getPlanet(id: string) {
  return api<Planet>(`/planets/${id}`);
}
