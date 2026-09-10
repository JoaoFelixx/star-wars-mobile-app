import {
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import type { Vehicle, VehicleAPIResponse } from '@/types/vehicle';

import { getVehicles } from '@/services/api/vehicle';


interface VehicleAddMethod {
  type: 'add-vehicles';
  vehicles: Vehicle[];
}

type MutationProps = VehicleAddMethod;

interface MutateResult {
  mutateProps: MutationProps;
}


export function useVehicles(): UseQueryResult<VehicleAPIResponse, Error> {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}

export function useMutateVehicles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutateProps: MutationProps): Promise<MutateResult> => {
      if (mutateProps.type === 'add-vehicles') {
        return { mutateProps };
      }

      return { mutateProps };
    },
    onSuccess: (successProps) => {
      queryClient.setQueryData(['vehicles'], (currentData: VehicleAPIResponse | undefined) => {
        if (!currentData) {
          return currentData;
        }

        if (successProps.mutateProps.type === 'add-vehicles') {
          const filteredResults = [
            ...currentData.results,
            ...successProps.mutateProps.vehicles,
          ].filter((vehicle, index, array) => {
            // Geralmente o filtro é por ID mas a API do Star Wars não retorna o ID do veículo, então estou filtrando pelo nome
            return array.findIndex((item) => item.name === vehicle.name) === index;
          });

          return { ...currentData, results: filteredResults };
        }

        return currentData;
      });
    },
  });
}
