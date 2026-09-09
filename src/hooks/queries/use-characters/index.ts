import {
  type UseQueryResult,

  useQuery,
} from "@tanstack/react-query";

import type { CharacterAPIResponse } from "@/types/character";

import { getCharacters } from "@/services/api/character";


export function useCharacters(): UseQueryResult<CharacterAPIResponse, Error> {
  return useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: {
      count: 0,
      results: [],
    },
  });
}