import React, { useEffect, useState } from 'react';
import { View, Button, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native';

export default function TimePicker({ onTimeSelected }: { onTimeSelected: (date: Date) => void }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(Platform.OS === 'ios'); // iOS: sempre mostrar, Android: não

  useEffect(() => {
    onTimeSelected(date);  // ✅ Garante que sempre envie o horário inicial
  }, []);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');  // para iOS sempre mostrar
    if (selectedDate) {
      setDate(selectedDate);
      onTimeSelected(selectedDate);
    }
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View>
      {Platform.OS === 'android' && (
        <TouchableOpacity onPress={showMode} style={styles.botaoSelecionar}>
        <Text style={styles.textBotao}>Selecionar Hora</Text>
      </TouchableOpacity>
      )}

      {show && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}

      <Text style={styles.text}>Hora Selecionada: {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  picker: {
    marginHorizontal: 'auto'
  },
  botaoAgendar: {
    backgroundColor: '#A6633C',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 34,
    marginTop: 20
  },
  textBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  botaoSelecionar: {
    backgroundColor: '#A6633C',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  text: {
    fontWeight: 'bold',
    marginHorizontal: 'auto'
  }
});
