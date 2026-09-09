import { type UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Character, CharacterAPIResponse } from '@/types/character';

import { getCharacters } from '@/services/api/character';

interface CharacterAddMethod {
  type: 'add-characters';
  characters: Character[];
}

type MutationProps = CharacterAddMethod;

interface MutateResult {
  mutateProps: MutationProps;
}

export function useCharacters(): UseQueryResult<CharacterAPIResponse, Error> {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}

export function useMutateCharacters() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutateProps: MutationProps): Promise<MutateResult> => {
      if (mutateProps.type === 'add-characters') {
        return { mutateProps };
      }

      return { mutateProps };
    },
    onSuccess: (successProps) => {
      queryClient.setQueryData(['characters'], (currentData: CharacterAPIResponse | undefined) => {
        if (!currentData) {
          return currentData;
        }

        if (successProps.mutateProps.type === 'add-characters') {
          const filteredResults = [
            ...currentData.results,
            ...successProps.mutateProps.characters,
          ].filter((character, index, array) => {
            // Geralmente o filtro é por ID mas a API do Star Wars não retorna o ID do personagem, então estou filtrando pelo nome
            return array.findIndex((item) => item.name === character.name) === index;
          });

          return { ...currentData, results: filteredResults };
        }

        return currentData;
      });
    },
  });
}
