import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { publishMessage } from '../../services/mqttServices';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [velo, setVelo] = useState('');
  const [scaleArmazenamento, setScaleArmazenamento] = useState('');
  const [scalePote, setScalePote] = useState('');

  const handleSalvar = () => {
    // Publica revolução
    const revolutionPayload = {
      cmd: 'revolution',
      val: velo,
    };
    publishMessage(JSON.stringify(revolutionPayload));

    // Publica escala das balanças
    const balancePayload = {
      cmd: 'balance',
      armazenamento: scaleArmazenamento,
      pote: scalePote,
    };
    publishMessage(JSON.stringify(balancePayload));

    console.log('Mensagens publicadas via MQTT!');
  };

  const handleTarar = () => {
    const tarePayload = {
      cmd: 'tare',
    };
    publishMessage(JSON.stringify(tarePayload));
    console.log('Comando de tarar enviado');
  };

  return (
    <SafeAreaProvider style={styles.screen}>
      <Text style={styles.text}>Configurações</Text>

      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', gap: 12 }}>
        <TextInput
          style={styles.input}
          inputMode='numeric'
          placeholder="Setar Velocidade"
          placeholderTextColor="#999"
          value={velo}
          onChangeText={setVelo}
        />
        <TextInput
          style={styles.input}
          inputMode='numeric'
          placeholder="Scale Armazenamento"
          placeholderTextColor="#999"
          value={scaleArmazenamento}
          onChangeText={setScaleArmazenamento}
        />
        <TextInput
          style={styles.input}
          inputMode='numeric'
          placeholder="Scale Pote"
          placeholderTextColor="#999"
          value={scalePote}
          onChangeText={setScalePote}
        />
        <TouchableOpacity style={styles.botaoTarar} onPress={handleTarar}>
          <Text style={styles.textoBotao}>Tarar Balança</Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={handleSalvar}
        >
          <Text style={styles.textoBotao}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F2E6D8',
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  botaoSalvar: {
    alignSelf: 'center',
    backgroundColor: '#008000',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  botaoTarar: {
    backgroundColor: '#A6633C',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
