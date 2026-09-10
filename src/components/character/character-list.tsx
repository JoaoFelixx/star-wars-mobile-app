import { useRef } from 'react';
import { FlatList } from 'react-native';

import type { CharacterAPIResponse } from '@/types/character';

import { getCharactersByPagination } from '@/services/api/character';

import { useCharacterImages } from '@/hooks/queries/use-character-images';
import { useMutateCharacters } from '@/hooks/queries/use-characters';

import { mapCharacter } from '@/util/mapper/map-character';

import { CharacterCard } from './character-card';


interface CharacterListProps {
  charactersData: CharacterAPIResponse;
  isLoading: boolean;
  refetch(): void;
}


export const CharacterList = ({ charactersData, isLoading, refetch }: CharacterListProps) => {
  const { mutate } = useMutateCharacters();
  const { data: characterImages } = useCharacterImages();
  const timerRequestRef = useRef<number>(null);



  const onEndOfScrollGoNextPage = () => {
    if (timerRequestRef.current) {
      clearTimeout(timerRequestRef.current);
    }

    timerRequestRef.current = setTimeout(async () => {
      try {
        const allCharacters = charactersData.results;

        const haveMoreCharacters = allCharacters.length < charactersData.count;

        if (!haveMoreCharacters) {
          return
        }

        const nextPage = Math.ceil(allCharacters.length / 10) + 1;

        const charactersOnNextPage = await getCharactersByPagination(nextPage);

        const formattedCharacters = Array.isArray(charactersOnNextPage.results)
          ? charactersOnNextPage.results
          : []

        mutate({
          type: "add-characters",
          characters: formattedCharacters
        });

      } catch { }
    }, 500)
  }


  return (
    <FlatList
      data={charactersData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      onEndReached={onEndOfScrollGoNextPage}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <CharacterCard character={mapCharacter(item, characterImages)} />}
    />
  )
}