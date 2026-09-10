import {
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import type { Starship, StarshipAPIResponse } from '@/types/starship';

import { getStarships } from '@/services/api/starship';


interface StarshipAddMethod {
  type: 'add-starships';
  starships: Starship[];
}

type MutationProps = StarshipAddMethod;

interface MutateResult {
  mutateProps: MutationProps;
}


export function useStarships(): UseQueryResult<StarshipAPIResponse, Error> {
  return useQuery({
    queryKey: ['starships'],
    queryFn: getStarships,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}

export function useMutateStarships() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutateProps: MutationProps): Promise<MutateResult> => {
      if (mutateProps.type === 'add-starships') {
        return { mutateProps };
      }

      return { mutateProps };
    },
    onSuccess: (successProps) => {
      queryClient.setQueryData(['starships'], (currentData: StarshipAPIResponse | undefined) => {
        if (!currentData) {
          return currentData;
        }

        if (successProps.mutateProps.type === 'add-starships') {
          const filteredResults = [
            ...currentData.results,
            ...successProps.mutateProps.starships,
          ].filter((starship, index, array) => {
            // Geralmente o filtro é por ID mas a API do Star Wars não retorna o ID da nave, então estou filtrando pelo nome
            return array.findIndex((item) => item.name === starship.name) === index;
          });

          return { ...currentData, results: filteredResults };
        }

        return currentData;
      });
    },
  });
}
