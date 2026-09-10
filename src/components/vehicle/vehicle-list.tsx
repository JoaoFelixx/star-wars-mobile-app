import { useRef } from 'react';
import { FlatList } from 'react-native';

import type { VehicleAPIResponse } from '@/types/vehicle';

import { getVehiclesByPagination } from '@/services/api/vehicle';

import { useMutateVehicles } from '@/hooks/queries/use-vehicles';

import { mapVehicle } from '@/util/mapper/map-vehicle';

import { VehicleCard } from './vehicle-card';


interface VehicleListProps {
  vehiclesData: VehicleAPIResponse;
  isLoading: boolean;
  refetch(): void;
}


export const VehicleList = ({ vehiclesData, isLoading, refetch }: VehicleListProps) => {
  const { mutate } = useMutateVehicles();
  const timerRequestRef = useRef<number>(null);



  const onEndOfScrollGoNextPage = () => {
    if (timerRequestRef.current) {
      clearTimeout(timerRequestRef.current);
    }

    timerRequestRef.current = setTimeout(async () => {
      try {
        const allVehicles = vehiclesData.results;

        const haveMoreVehicles = allVehicles.length < vehiclesData.count;

        if (!haveMoreVehicles) {
          return
        }

        const nextPage = Math.ceil(allVehicles.length / 10) + 1;

        const vehiclesOnNextPage = await getVehiclesByPagination(nextPage);

        const formattedVehicles = Array.isArray(vehiclesOnNextPage.results)
          ? vehiclesOnNextPage.results
          : []

        mutate({
          type: "add-vehicles",
          vehicles: formattedVehicles
        });

      } catch {/* Something break on pagination request */ }
    }, 500)
  }


  return (
    <FlatList
      data={vehiclesData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      onEndReached={onEndOfScrollGoNextPage}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <VehicleCard vehicle={mapVehicle(item)} />}
    />
  )
}
