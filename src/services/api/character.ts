import type { Character, CharacterAPIResponse } from '@/types/character';

import { api } from './client';


export function getCharacters() {

  const charactersData = api<CharacterAPIResponse>('/people');

  return charactersData;
}

export function getCharactersByPagination(pagination?: number) {
  const url = pagination ? `/people/?page=${pagination}` : '/people';

  const charactersData = api<CharacterAPIResponse>(url);

  return charactersData;
}

export function getCharacter(id: string) {
  return api<Character>(`/people/${id}`);
}
