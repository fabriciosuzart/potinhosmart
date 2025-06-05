import { useCard } from '../components/CardContext';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Switch } from 'react-native';
import { useState } from 'react';
import TimePicker from '@/components/timerpicker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificacaoPicker from '@/components/notificaPicker';

export default function Adicionar() {
  const { addCard } = useCard();
  const router = useRouter();

  const [titulo, setTitulo] = useState('Refeição');
  const [hora, setHora] = useState('');
  const [diasSelecionados, setDiasSelecionados] = useState(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']);
  const [porcao, setPorcao] = useState('');
  const [notificar, setNotificar] = useState('Não Notificar');

  const handleTimeSelected = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formatted = `${hours}:${minutes}`;

    setHora(formatted);
  };

  const toggleDia = (dia: string) => {
    setDiasSelecionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  function salvar() {
    addCard({
      titulo,
      hora,
      repetir: diasSelecionados.length > 0 ? diasSelecionados.join(', ') : 'Nunca',
      notificar
    });
    router.back();
  }

  return (
    <SafeAreaProvider style={styles.screen}>
      <TimePicker onTimeSelected={handleTimeSelected} />

      <Text style={styles.label}>Título:</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título"
        style={styles.textinput}
      />

      <NotificacaoPicker value={notificar} onChange={setNotificar} />

      <Text style={styles.label}>Repetir:</Text>
      <View style={styles.diasContainer}>
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map(dia => (
          <TouchableOpacity
            key={dia}
            onPress={() => toggleDia(dia)}
            style={[
              styles.diaBotao,
              diasSelecionados.includes(dia) && styles.diaSelecionado
            ]}
          >
            <Text style={[
              styles.text,
              diasSelecionados.includes(dia) && styles.selectedText
            ]}>
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={salvar} style={styles.botaoSalvar}>
        <Text style={styles.textBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.botaoCancelar}>
        <Text style={styles.textBotao}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F2E6D8',
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  botaoCancelar: {
    backgroundColor: '#f79c68',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    top: 80
  },
  botaoSalvar: {
    backgroundColor: '#A6633C',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 34,
    marginTop: 20,
    top: 80
  },
  textBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  textinput: {
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 350,
    backgroundColor: '#fff',
    borderBlockColor: 'white',
    marginTop: 5,
    //marginBottom: -10 
  },
  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginHorizontal: 'auto'
  },
  diaBotao: {
    padding: 10,
    margin: 3,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  diaSelecionado: {
    backgroundColor: '#A6633C',
  },
  textDia: {
    color: '#fff',
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  selectedDia: {
    backgroundColor: '#333',
  },
});
