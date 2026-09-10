import type { Species } from "@/types/species";

export function mapSpecies(species: Species) {
  const id = species.url.match(/\/(\d+)\/$/)?.[1] || "";

  return {
    ...species,
    id,
  };
}
