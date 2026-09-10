const AKABAB_API_URL = 'https://akabab.github.io/starwars-api/api/all.json';

interface AkababCharacter {
  id: number;
  image: string;
}

export async function getCharacterImages(): Promise<Record<string, string>> {
  const response = await fetch(AKABAB_API_URL);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const characters: AkababCharacter[] = await response.json();

  return characters.reduce<Record<string, string>>((imagesById, character) => {
    imagesById[character.id] = character.image;
    return imagesById;
  }, {});
}
