import { useRef } from 'react';
import { FlatList } from 'react-native';

import type { StarshipAPIResponse } from '@/types/starship';

import { getStarshipsByPagination } from '@/services/api/starship';

import { useMutateStarships } from '@/hooks/queries/use-starships';

import { mapStarship } from '@/util/mapper/map-starship';

import { StarshipCard } from './starship-card';


interface StarshipListProps {
  starshipsData: StarshipAPIResponse;
  isLoading: boolean;
  refetch(): void;
}


export const StarshipList = ({ starshipsData, isLoading, refetch }: StarshipListProps) => {
  const { mutate } = useMutateStarships();
  const timerRequestRef = useRef<number>(null);



  const onEndOfScrollGoNextPage = () => {
    if (timerRequestRef.current) {
      clearTimeout(timerRequestRef.current);
    }

    timerRequestRef.current = setTimeout(async () => {
      try {
        const allStarships = starshipsData.results;

        const haveMoreStarships = allStarships.length < starshipsData.count;

        if (!haveMoreStarships) {
          return
        }

        const nextPage = Math.ceil(allStarships.length / 10) + 1;

        const starshipsOnNextPage = await getStarshipsByPagination(nextPage);

        const formattedStarships = Array.isArray(starshipsOnNextPage.results)
          ? starshipsOnNextPage.results
          : []

        mutate({
          type: "add-starships",
          starships: formattedStarships
        });

      } catch {/* Something break on pagination request */ }
    }, 500)
  }


  return (
    <FlatList
      data={starshipsData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      onEndReached={onEndOfScrollGoNextPage}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <StarshipCard starship={mapStarship(item)} />}
    />
  )
}
