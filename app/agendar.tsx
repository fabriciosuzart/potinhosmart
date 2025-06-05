import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCard } from '../components/CardContext';

export const options = {
  title: 'Agendar',
  headerBackTitleVisible: false,
};

export default function AgendarScreen() {
  const router = useRouter();
  const { cards } = useCard();

  return (
    <SafeAreaProvider style={styles.screen}>
      <View>
        <Text style={styles.text}>Refeições</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-outline" size={50} color="black" style={{ alignSelf: "center" }} onPress={() => router.push('/adicionar')} />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={cards}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.horario}>{item.hora}</Text>
              <Text>{item.titulo}, {item.repetir}</Text>
              <Text>Lembrete {item.notificar} min antes</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    left: 20,
    top: 26
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    left: 20,
    top: 27
  },
  item: {
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 5 },
    position: "relative",
    width: 380
  },
  screen: {
    backgroundColor: '#F2E6D8',
  },
  horario: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});