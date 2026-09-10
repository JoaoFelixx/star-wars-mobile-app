import type { Film } from "@/types/film";

import { getFilmImage } from "../get-film-image";



export function mapFilm(film: Film) {
  const id = film.url.match(/\/(\d+)\/$/)?.[1] || "";

  return {
    ...film,
    id,
    image: getFilmImage(film.episode_id),
  };
}
