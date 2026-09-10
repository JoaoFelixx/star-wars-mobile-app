import {
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import type { Film, FilmAPIResponse } from '@/types/film';

import { getFilms } from '@/services/api/film';


interface FilmAddMethod {
  type: 'add-films';
  films: Film[];
}

type MutationProps = FilmAddMethod;

interface MutateResult {
  mutateProps: MutationProps;
}


export function useFilms(): UseQueryResult<FilmAPIResponse, Error> {
  return useQuery({
    queryKey: ['films'],
    queryFn: getFilms,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}

export function useMutateFilms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutateProps: MutationProps): Promise<MutateResult> => {
      if (mutateProps.type === 'add-films') {
        return { mutateProps };
      }

      return { mutateProps };
    },
    onSuccess: (successProps) => {
      queryClient.setQueryData(['films'], (currentData: FilmAPIResponse | undefined) => {
        if (!currentData) {
          return currentData;
        }

        if (successProps.mutateProps.type === 'add-films') {
          const filteredResults = [
            ...currentData.results,
            ...successProps.mutateProps.films,
          ].filter((film, index, array) => {
            // Geralmente o filtro é por ID mas a API do Star Wars não retorna o ID do filme, então estou filtrando pelo titulo
            return array.findIndex((item) => item.title === film.title) === index;
          });

          return { ...currentData, results: filteredResults };
        }

        return currentData;
      });
    },
  });
}