import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroBanner } from '@/components/home/hero-banner';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-sw-black">
      <View className="border-b border-neutral-200 px-5 pb-4 pt-2 dark:border-sw-border">
        <Text className="text-xs font-semibold uppercase tracking-[4px] text-sw-yellow">
          Star Wars
        </Text>
        <Text className="text-2xl font-bold text-black dark:text-sw-text">Bem-vindo</Text>
      </View>

      <ScrollView contentContainerClassName="pb-6">
        <HeroBanner />
      </ScrollView>
    </SafeAreaView>
  );
}
