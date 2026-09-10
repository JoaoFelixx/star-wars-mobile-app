import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { Film } from '@/types/film';

interface FilmCardProps {
  film: Film & { id: string; image?: string };
}

export const FilmCard = ({ film }: FilmCardProps) => {
  const releaseYear = film.release_date?.slice(0, 4);

  return (
    <View className="mb-3 flex-row overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-sw-border dark:bg-sw-panel">
      {film.image ? (
        <Image
          source={{ uri: film.image }}
          contentFit="cover"
          style={styles.poster}
        />
      ) : (
        <View className="h-24 w-16 items-center justify-center self-center bg-black">
          <Text className="text-2xl font-bold text-sw-yellow">{film.episode_id}</Text>
        </View>
      )}

      <View className="flex-1 gap-1.5 px-4 py-3">
        <Text
          className="text-base font-bold uppercase tracking-wide text-black dark:text-sw-text"
          numberOfLines={1}
        >
          {film.title}
        </Text>

        <View className="flex-row gap-4">
          <Stat label="Episódio" value={`${film.episode_id}`} />
          <Stat label="Diretor" value={film.director} />
          <Stat label="Ano" value={releaseYear} />
        </View>

        <Text
          className="text-xs italic text-neutral-500 dark:text-sw-muted"
          numberOfLines={2}
        >
          {film.opening_crawl?.replace(/\r?\n/g, ' ')}
        </Text>
      </View>

      <View className="w-1.5 bg-sw-yellow" />
    </View>
  );
};

function Stat({ label, value }: { label: string; value?: string }) {
  return (
    <View>
      <Text className="text-[10px] uppercase text-neutral-500 dark:text-sw-muted">{label}</Text>
      <Text className="text-xs font-medium text-neutral-800 dark:text-sw-text" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: 64,
    height: 96,
    backgroundColor: '#000',
  },
});
