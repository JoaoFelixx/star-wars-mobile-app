import { useRef } from "react";
import { FlatList } from "react-native";

import type { FilmAPIResponse } from "@/types/film";

import { useMutateFilms } from "@/hooks/queries/use-films";

import { getFilmsByPagination } from "@/services/api/film";

import { mapFilm } from "@/util/mapper/map-film";

import { FilmCard } from "./film-card";


interface FilmListProps {
  filmsData: FilmAPIResponse;
  isLoading: boolean;

  refetch(): void;
}


export const FilmList = ({
  filmsData,
  isLoading,

  refetch,
}: FilmListProps) => {
  const { mutate } = useMutateFilms();
  const timerRequestRef = useRef<number>(null);



  const onEndOfScrollGoNextPage = () => {
    if (timerRequestRef.current) {
      clearTimeout(timerRequestRef.current);
    }

    timerRequestRef.current = setTimeout(async () => {
      try {
        const allFilms = filmsData.results;

        const haveMoreFilms = allFilms.length < filmsData.count;

        if (!haveMoreFilms) {
          return
        }

        const nextPage = Math.ceil(allFilms.length / 10) + 1;

        const charactersOnNextPage = await getFilmsByPagination(nextPage);

        const formattedFilms = Array.isArray(charactersOnNextPage.results)
          ? charactersOnNextPage.results
          : []

        mutate({
          type: "add-films",
          films: formattedFilms
        });

      } catch {/* Something break on pagination request */ }
    }, 500)
  }


  return (
    <FlatList
      data={filmsData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      onEndReached={onEndOfScrollGoNextPage}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <FilmCard film={mapFilm(item)} />}
    />
  )
}