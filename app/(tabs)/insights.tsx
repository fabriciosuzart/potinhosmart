import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
   <SafeAreaProvider style={styles.screen}>
    <Text style={styles.text}>
      Tela de insights
    </Text>
   </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  screen: {
    backgroundColor: '#F2E6D8',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',

  }
});
