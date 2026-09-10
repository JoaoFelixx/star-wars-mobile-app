import { useRef } from 'react';
import { FlatList } from 'react-native';

import type { SpeciesAPIResponse } from '@/types/species';

import { getSpeciesByPagination } from '@/services/api/species';

import { useMutateSpecies } from '@/hooks/queries/use-species';

import { mapSpecies } from '@/util/mapper/map-species';

import { SpeciesCard } from './species-card';


interface SpeciesListProps {
  speciesData: SpeciesAPIResponse;
  isLoading: boolean;
  refetch(): void;
}


export const SpeciesList = ({ speciesData, isLoading, refetch }: SpeciesListProps) => {
  const { mutate } = useMutateSpecies();
  const timerRequestRef = useRef<number>(null);



  const onEndOfScrollGoNextPage = () => {
    if (timerRequestRef.current) {
      clearTimeout(timerRequestRef.current);
    }

    timerRequestRef.current = setTimeout(async () => {
      try {
        const allSpecies = speciesData.results;

        const haveMoreSpecies = allSpecies.length < speciesData.count;

        if (!haveMoreSpecies) {
          return
        }

        const nextPage = Math.ceil(allSpecies.length / 10) + 1;

        const speciesOnNextPage = await getSpeciesByPagination(nextPage);

        const formattedSpecies = Array.isArray(speciesOnNextPage.results)
          ? speciesOnNextPage.results
          : []

        mutate({
          type: "add-species",
          species: formattedSpecies
        });

      } catch {/* Something break on pagination request */ }
    }, 500)
  }


  return (
    <FlatList
      data={speciesData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      onEndReached={onEndOfScrollGoNextPage}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <SpeciesCard species={mapSpecies(item)} />}
    />
  )
}
