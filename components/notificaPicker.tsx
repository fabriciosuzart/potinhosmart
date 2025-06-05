import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Ionicons } from '@expo/vector-icons';

interface NotificacaoPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export default function NotificacaoPicker({ value, onChange }: NotificacaoPickerProps) {
  const options = [
    { key: '0', label: 'Não Notificar', value: 0 },
    { key: '1', label: '5 min', value: 5 },
    { key: '2', label: '10 min', value: 10 },
    { key: '3', label: '15 min', value: 15 },
    { key: '4', label: '30 min', value: 30 },
  ];

  return (
    <ModalSelector
      data={options}
      initValue={value === 0 ? 'Não Notificar' : `${value} min`}
      onChange={(option) => onChange(option.value)}
      cancelText="Cancelar"
    >
      <Text style={styles.label}>Notificar antes:</Text>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10
      }}>
        <Text style={{ flex: 1 }}>
          {value === 0 ? 'Não Notificar' : `${value} min`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#555" />
      </View>
    </ModalSelector>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: -5, fontWeight: 'bold' },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  selectorText: { fontSize: 16, color: '#333' },
  optionText: { fontSize: 16 },
  icon: {
    position: 'absolute',
    left: 310
  },
});
