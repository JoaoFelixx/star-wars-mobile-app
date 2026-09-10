import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CharacterList } from '@/components/character/character-list';
import { Spinner } from '@/components/ui/spinner';

import { useCharacters } from '@/hooks/queries/use-characters';

export default function CharactersScreen() {
  const { data: charactersData, isLoading, isPlaceholderData, isError, refetch } = useCharacters();

  const isInitialLoading = isLoading || isPlaceholderData;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-sw-black">
      <View className="border-b border-neutral-200 px-5 pb-4 pt-2 dark:border-sw-border">
        <Text className="text-xs font-semibold uppercase tracking-[4px] text-sw-yellow">
          Star Wars
        </Text>
        <Text className="text-2xl font-bold text-black dark:text-sw-text">
          Personagens
          {charactersData && charactersData.count > 0 ? (
            <Text className="text-base font-normal text-neutral-500 dark:text-sw-muted">
              {' '}
              ({charactersData.count})
            </Text>
          ) : null}
        </Text>
      </View>

      {isInitialLoading ? (
        <View className="flex-1 items-center justify-center gap-4">
          <Spinner />
          <Text className="text-sm text-neutral-500 dark:text-sw-muted">
            Puxando dados da galáxia...
          </Text>
        </View>
      ) : isError || !charactersData ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-sw-red">
            Erro no aplicativo, tente novamente mais tarde
          </Text>
        </View>
      ) : (
        <CharacterList charactersData={charactersData} isLoading={isLoading} refetch={refetch} />
      )}
    </SafeAreaView>
  );
}
