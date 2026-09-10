import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSpecies } from '@/hooks/queries/use-species';

import { SpeciesList } from '@/components/species/species-list';
import { Spinner } from '@/components/ui/spinner';


export default function SpeciesScreen() {
  const {
    data: speciesData,
    isLoading,
    isPlaceholderData,
    isError,

    refetch
  } = useSpecies();

  const isInitialLoading = isLoading || isPlaceholderData;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-sw-black">
      <View className="border-b border-neutral-200 px-5 pb-4 pt-2 dark:border-sw-border">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="text-xs font-semibold uppercase tracking-[4px] text-sw-yellow">
            ‹ Star Wars
          </Text>
        </Pressable>
        <Text className="text-2xl font-bold text-black dark:text-sw-text">
          Espécies
          {speciesData && speciesData.count > 0 ? (
            <Text className="text-base font-normal text-neutral-500 dark:text-sw-muted">
              {' '}
              ({speciesData.count})
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
      ) : isError || !speciesData ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-sw-red">
            Erro no aplicativo, tente novamente mais tarde
          </Text>
        </View>
      ) : (
        <SpeciesList speciesData={speciesData} isLoading={isLoading} refetch={refetch} />
      )}
    </SafeAreaView>
  );
}
