import type { Starship } from "@/types/starship";

export function mapStarship(starship: Starship) {
  const id = starship.url.match(/\/(\d+)\/$/)?.[1] || "";

  return {
    ...starship,
    id,
  };
}
