import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

import { useCharacters } from '@/hooks/queries/use-characters';


export default function CharactersScreen() {
  const {
    data: charactersData,
    isLoading,

    refetch,
  } = useCharacters();


  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <Text style={styles.text}>Puxando dados...</Text>
      ) : (
        <View>
          {charactersData ? (
            <>
              <Text style={styles.text}>Lista de personagens ({charactersData.count})</Text>
              <FlatList
                data={charactersData.results}
                refreshing={isLoading}
                onRefresh={refetch}
                renderItem={({ item }) => (
                  <Text>{item.name}</Text>
                )}
              />
            </>
          ) : (
            <Text>Erro no aplicativo, tente novamente mais tarde</Text>
          )}
        </View>
      )}
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
    color: "#ff0000"
  }
});
