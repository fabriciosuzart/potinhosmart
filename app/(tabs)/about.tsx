import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Text style={styles.title}>Potinho Smart</Text>
          <Text style={styles.text}>
            Nosso projeto nasceu com o objetivo de facilitar o dia a dia de tutores com rotinas atarefadas, oferecendo um alimentador inteligente para pets.
            Através do aplicativo, é possível automatizar e monitorar a alimentação dos animais, garantindo praticidade, controle e bem-estar para seu melhor amigo.
          </Text>
          <Text style={styles.subtitle}>Desenvolvedores do projeto</Text>
          <View style={styles.profileContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profileItem}>
                <Image style={styles.profile} source={require('../../assets/images/andreas.jpeg')} />
                <Text style={styles.profileText}>Andreas Porcel - 216590</Text>
              </View>

              <View style={styles.profileItem}>
                <Image style={styles.profile} source={require('../../assets/images/anna.jpeg')} />
                <Text style={styles.profileText}>Anna Clara - 217178</Text>
              </View>

              <View style={styles.profileItem}>
                <Image style={styles.profile} source={require('../../assets/images/fabricio.jpeg')} />
                <Text style={styles.profileText}>Fabricio Andrade - 215446</Text>
              </View>

              <View style={styles.profileItem}>
                <Image style={styles.profile} source={require('../../assets/images/juliana.jpeg')} />
                <Text style={styles.profileText}>Juliana Pallin - 214707</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    backgroundColor: '#F2E6D8',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 420
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
    marginHorizontal: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    alignSelf: 'center'
  },
  text: {
    fontSize: 15,
    marginHorizontal: 5
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#trasnparent',
    padding: 10,
    borderRadius: 15,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});