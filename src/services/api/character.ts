import type { Character, CharacterAPIResponse } from '@/types/character';

import { api } from './client';

export function getCharacters() {
  const charactersData = api<CharacterAPIResponse>('/people');

  return charactersData;
}

export function getCharacter(id: string) {
  return api<Character>(`/people/${id}`);
}
