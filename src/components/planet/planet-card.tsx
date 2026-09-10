import { Text, View } from 'react-native';

import type { Planet } from '@/types/planet';

interface PlanetCardProps {
  planet: Planet & { id: string };
}

export const PlanetCard = ({ planet }: PlanetCardProps) => {
  const initial = planet.name.charAt(0).toUpperCase();

  return (
    <View className="mb-3 flex-row overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-sw-border dark:bg-sw-panel">
      <View className="h-20 w-16 items-center justify-center self-center bg-black">
        <Text className="text-2xl font-bold text-sw-yellow">{initial}</Text>
      </View>

      <View className="flex-1 gap-1.5 px-4 py-3">
        <Text
          className="text-base font-bold uppercase tracking-wide text-black dark:text-sw-text"
          numberOfLines={1}
        >
          {planet.name}
        </Text>

        <View className="flex-row gap-4">
          <Stat label="Clima" value={planet.climate} />
          <Stat label="Terreno" value={planet.terrain} />
          <Stat label="População" value={planet.population} />
        </View>
      </View>

      <View className="w-1.5 bg-sw-yellow" />
    </View>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="max-w-[33%]">
      <Text className="text-[10px] uppercase text-neutral-500 dark:text-sw-muted">{label}</Text>
      <Text className="text-xs font-medium text-neutral-800 dark:text-sw-text" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
