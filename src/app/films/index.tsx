import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

export default function FilmsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text}>Lista de filmes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
  text: {
    color: '#ff0000',
  },
});
