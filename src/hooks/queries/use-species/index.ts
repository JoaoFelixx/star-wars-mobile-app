import {
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import type { Species, SpeciesAPIResponse } from '@/types/species';

import { getSpecies } from '@/services/api/species';


interface SpeciesAddMethod {
  type: 'add-species';
  species: Species[];
}

type MutationProps = SpeciesAddMethod;

interface MutateResult {
  mutateProps: MutationProps;
}


export function useSpecies(): UseQueryResult<SpeciesAPIResponse, Error> {
  return useQuery({
    queryKey: ['species'],
    queryFn: getSpecies,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}

export function useMutateSpecies() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutateProps: MutationProps): Promise<MutateResult> => {
      if (mutateProps.type === 'add-species') {
        return { mutateProps };
      }

      return { mutateProps };
    },
    onSuccess: (successProps) => {
      queryClient.setQueryData(['species'], (currentData: SpeciesAPIResponse | undefined) => {
        if (!currentData) {
          return currentData;
        }

        if (successProps.mutateProps.type === 'add-species') {
          const filteredResults = [
            ...currentData.results,
            ...successProps.mutateProps.species,
          ].filter((specie, index, array) => {
            // Geralmente o filtro é por ID mas a API do Star Wars não retorna o ID da espécie, então estou filtrando pelo nome
            return array.findIndex((item) => item.name === specie.name) === index;
          });

          return { ...currentData, results: filteredResults };
        }

        return currentData;
      });
    },
  });
}
