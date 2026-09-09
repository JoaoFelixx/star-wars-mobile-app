import { FlatList } from 'react-native';

import type { CharacterAPIResponse } from '@/types/character';

import { CharacterCard } from './character-card';

interface CharacterListProps {
  charactersData: CharacterAPIResponse;
  isLoading: boolean;
  refetch(): void;
}

export const CharacterList = ({ charactersData, isLoading, refetch }: CharacterListProps) => {
  return (
    <FlatList
      data={charactersData.results}
      keyExtractor={(item) => item.url}
      refreshing={isLoading}
      onRefresh={refetch}
      contentContainerClassName="px-4 py-4"
      renderItem={({ item }) => <CharacterCard character={item} />}
    />
  );
};
