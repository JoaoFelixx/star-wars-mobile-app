import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { getCharacterImages } from '@/services/api/character-image';

export function useCharacterImages(): UseQueryResult<Record<string, string>, Error> {
  return useQuery({
    queryKey: ['character-images'],
    queryFn: getCharacterImages,
    staleTime: 1000 * 60 * 30, // 30 minutos, dificilmente muda
  });
}
