import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Ionicons } from '@expo/vector-icons';

interface NotificacaoPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NotificacaoPicker({ value, onChange }: NotificacaoPickerProps) {
  const options = [
    { key: '0', label: 'Não Notificar' },
    { key: '1', label: '5 min' },
    { key: '2', label: '10 min' },
    { key: '3', label: '15 min' },
    { key: '4', label: '30 min' },
  ];

  return (
    <ModalSelector
      data={options}
      initValue={value}
      onChange={(option) => onChange(option.label)}
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
        <Text style={{ flex: 1 }}>{value}</Text>
        <Ionicons name="chevron-down" size={20} color="#555" />
      </View>
    </ModalSelector>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: -5, fontWeight: 'bold'},
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
