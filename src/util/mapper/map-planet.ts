import type { Planet } from "@/types/planet";

export function mapPlanet(planet: Planet) {
  const id = planet.url.match(/\/(\d+)\/$/)?.[1] || "";

  return {
    ...planet,
    id,
  };
}
