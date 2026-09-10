import { useRef } from 'react';
import { FlatList } from 'react-native';

import type { PlanetAPIResponse } from '@/types/planet';

import { getPlanetsByPagination } from '@/services/api/planet';

import { useMutatePlanets } from '@/hooks/queries/use-planets';

import { mapPlanet } from '@/util/mapper/map-planet';

import { PlanetCard } from './planet-card';


interface PlanetListProps {
  planetsData: PlanetAPIResponse;
  isLoading: boolean;
  refetch(): void;
}


export const PlanetList = ({ planetsData, isLoading, refetch }: PlanetListProps) => {
  const { mutate } = useMutatePlanets();
  const timerRequestRef = useRef<number>(null);



  const onEndOfScrollGoNextPage = () => {
    if (timerRequestRef.current) {
      clearTimeout(timerRequestRef.current);
    }

    timerRequestRef.current = setTimeout(async () => {
      try {
        const allPlanets = planetsData.results;

        const haveMorePlanets = allPlanets.length < planetsData.count;

        if (!haveMorePlanets) {
          return
        }

        const nextPage = Math.ceil(allPlanets.length / 10) + 1;

        const planetsOnNextPage = await getPlanetsByPagination(nextPage);

        const formattedPlanets = Array.isArray(planetsOnNextPage.results)
          ? planetsOnNextPage.results
          : []

        mutate({
          type: "add-planets",
          planets: formattedPlanets
        });

      } catch {/* Something break on pagination request */ }
    }, 500)
  }


  return (
    <FlatList
      data={planetsData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      onEndReached={onEndOfScrollGoNextPage}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <PlanetCard planet={mapPlanet(item)} />}
    />
  )
}
