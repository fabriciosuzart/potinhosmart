import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar} from 'react-native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AdicionarScreen from './adicionar';

export const options = {
  title: 'Agendar',
  headerBackTitleVisible: false,
};

export default function AgendarScreen() {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <View>
        <Text style={styles.text}>Refeições</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-outline" size={50} color="black" style={{ alignSelf: "center" }}/>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id} 
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
    top: 26
  },
  item: {
    padding: 70,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 2 },
    position: "relative",
  },
});