export const getCharacterImage = (id: string, images: Record<string, string> = {}) => {
  return images[id];
}
