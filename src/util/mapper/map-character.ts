import type { Character } from "@/types/character";

import { getCharacterImage } from "../get-character-image";



export function mapCharacter(character: Character, images: Record<string, string> = {}) {
  const id = character.url.match(/\/(\d+)\/$/)?.[1] || "";

  return {
    ...character,
    id,
    image: getCharacterImage(id, images),
  };
}