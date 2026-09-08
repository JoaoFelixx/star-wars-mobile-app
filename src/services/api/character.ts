import type { Character } from '@/types/character';

import { api } from './client';


export function getCharacters() {
  return api<Character[]>('/people');
}

export function getCharacter(id: string) {
  return api<Character>(`/people/${id}`);
}