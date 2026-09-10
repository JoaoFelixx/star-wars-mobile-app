import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useCharacterImages } from '@/hooks/queries/use-character-images';
import { useFilms } from '@/hooks/queries/use-films';


const EPISODE_ROMAN_NUMERALS: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
};

const HERO_CHARACTER_ID = '4';
const HERO_EPISODE_ID = 6;


export const HeroBanner = () => {
  const { data: filmsData } = useFilms();
  const { data: characterImages } = useCharacterImages();

  const film = filmsData?.results.find((item) => item.episode_id === HERO_EPISODE_ID);
  const heroImage = characterImages?.[HERO_CHARACTER_ID];

  return (
    <View className="mx-4 mt-4 overflow-hidden rounded-3xl border border-sw-border bg-sw-black">
      <View style={styles.hero}>
        {heroImage ? (
          <Image source={{ uri: heroImage }} contentFit="cover" style={StyleSheet.absoluteFill} />
        ) : null}

        <LinearGradient
          colors={['rgba(10,10,10,0.97)', 'rgba(10,10,10,0.75)', 'rgba(10,10,10,0.1)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />

        <View className="flex-1 justify-between p-5">
          <Text className="text-xs font-semibold uppercase tracking-[4px] text-sw-yellow">
            Star Wars
          </Text>

          <View className="max-w-[75%] gap-3">
            <View>
              <Text className="text-3xl font-extrabold uppercase text-white">
                Episódio {EPISODE_ROMAN_NUMERALS[HERO_EPISODE_ID]}
              </Text>
              <Text className="text-lg font-bold uppercase text-sw-yellow" numberOfLines={2}>
                {film?.title ?? 'Return of the Jedi'}
              </Text>
            </View>

            <Text className="text-xs leading-5 text-neutral-300" numberOfLines={4}>
              {film?.opening_crawl?.replace(/\r?\n/g, ' ') ??
                'Luke Skywalker retorna ao seu planeta natal em uma tentativa de resgatar seu amigo Han Solo das garras do vil gangster Jabba, o Hutt.'}
            </Text>

            <Link href="/films" asChild>
              <Pressable className="flex-row items-center gap-2 self-start">
                <Text className="text-xs font-bold uppercase tracking-widest text-sw-yellow">
                  Saiba mais
                </Text>
                <Text className="text-sw-yellow">→</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: 420,
  },
});
