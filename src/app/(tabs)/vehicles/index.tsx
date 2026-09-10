import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVehicles } from '@/hooks/queries/use-vehicles';

import { VehicleList } from '@/components/vehicle/vehicle-list';
import { Spinner } from '@/components/ui/spinner';


export default function VehiclesScreen() {
  const {
    data: vehiclesData,
    isLoading,
    isPlaceholderData,
    isError,

    refetch
  } = useVehicles();

  const isInitialLoading = isLoading || isPlaceholderData;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-sw-black">
      <View className="border-b border-neutral-200 px-5 pb-4 pt-2 dark:border-sw-border">
        <Text className="text-xs font-semibold uppercase tracking-[4px] text-sw-yellow">
          Star Wars
        </Text>
        <Text className="text-2xl font-bold text-black dark:text-sw-text">
          Veículos
          {vehiclesData && vehiclesData.count > 0 ? (
            <Text className="text-base font-normal text-neutral-500 dark:text-sw-muted">
              {' '}
              ({vehiclesData.count})
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
      ) : isError || !vehiclesData ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-sw-red">
            Erro no aplicativo, tente novamente mais tarde
          </Text>
        </View>
      ) : (
        <VehicleList vehiclesData={vehiclesData} isLoading={isLoading} refetch={refetch} />
      )}
    </SafeAreaView>
  );
}
