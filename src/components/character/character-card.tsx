import { Text, View } from 'react-native';

import type { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const initial = character.name.charAt(0).toUpperCase();

  return (
    <View className="mb-3 flex-row overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-sw-border dark:bg-sw-panel pl-2">

      <View className="h-16 w-16 items-center justify-center self-center bg-black">
        <Text className="text-2xl font-bold text-sw-yellow">{initial}</Text>
      </View>

      <View className="flex-1 gap-1.5 px-4 py-3">
        <Text
          className="text-base font-bold uppercase tracking-wide text-black dark:text-sw-text"
          numberOfLines={1}
        >
          {character.name}
        </Text>

        <View className="flex-row gap-4">
          <Stat label="Gênero" value={character.gender} />
          <Stat label="Altura" value={`${character.height} cm`} />
          <Stat label="Nasc." value={character.birth_year} />
        </View>
      </View>

      <View className="w-1.5 bg-sw-yellow" />
    </View>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="text-[10px] uppercase text-neutral-500 dark:text-sw-muted">{label}</Text>
      <Text className="text-xs font-medium text-neutral-800 dark:text-sw-text">{value}</Text>
    </View>
  );
}
