import {
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import type { Planet, PlanetAPIResponse } from '@/types/planet';

import { getPlanets } from '@/services/api/planet';


interface PlanetAddMethod {
  type: 'add-planets';
  planets: Planet[];
}

type MutationProps = PlanetAddMethod;

interface MutateResult {
  mutateProps: MutationProps;
}


export function usePlanets(): UseQueryResult<PlanetAPIResponse, Error> {
  return useQuery({
    queryKey: ['planets'],
    queryFn: getPlanets,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}

export function useMutatePlanets() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutateProps: MutationProps): Promise<MutateResult> => {
      if (mutateProps.type === 'add-planets') {
        return { mutateProps };
      }

      return { mutateProps };
    },
    onSuccess: (successProps) => {
      queryClient.setQueryData(['planets'], (currentData: PlanetAPIResponse | undefined) => {
        if (!currentData) {
          return currentData;
        }

        if (successProps.mutateProps.type === 'add-planets') {
          const filteredResults = [
            ...currentData.results,
            ...successProps.mutateProps.planets,
          ].filter((planet, index, array) => {
            // Geralmente o filtro é por ID mas a API do Star Wars não retorna o ID do planeta, então estou filtrando pelo nome
            return array.findIndex((item) => item.name === planet.name) === index;
          });

          return { ...currentData, results: filteredResults };
        }

        return currentData;
      });
    },
  });
}
