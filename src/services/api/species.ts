import type { Species, SpeciesAPIResponse } from '@/types/species';

import { api } from './client';


export function getSpecies() {

  const speciesData = api<SpeciesAPIResponse>('/species');

  return speciesData;
}

export function getSpeciesByPagination(pagination?: number) {
  const url = pagination ? `/species/?page=${pagination}` : '/species';

  const speciesData = api<SpeciesAPIResponse>(url);

  return speciesData;
}

export function getSpecie(id: string) {
  return api<Species>(`/species/${id}`);
}
