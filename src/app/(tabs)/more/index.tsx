import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MoreLinkProps {
  href: '/species' | '/planets';
  icon: string;
  label: string;
}

const links: MoreLinkProps[] = [
  { href: '/species', icon: '🧬', label: 'Espécies' },
  { href: '/planets', icon: '🪐', label: 'Planetas' },
];

export default function MoreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-sw-black">
      <View className="border-b border-neutral-200 px-5 pb-4 pt-2 dark:border-sw-border">
        <Text className="text-xs font-semibold uppercase tracking-[4px] text-sw-yellow">
          Star Wars
        </Text>
        <Text className="text-2xl font-bold text-black dark:text-sw-text">Mais</Text>
      </View>

      <View className="px-4 py-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} asChild>
            <Pressable className="mb-3 flex-row items-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-sw-border dark:bg-sw-panel">
              <View className="h-16 w-16 items-center justify-center self-center bg-black">
                <Text className="text-2xl">{link.icon}</Text>
              </View>

              <Text className="flex-1 px-4 text-base font-bold uppercase tracking-wide text-black dark:text-sw-text">
                {link.label}
              </Text>

              <Text className="px-4 text-lg text-neutral-400 dark:text-sw-muted">›</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
}
