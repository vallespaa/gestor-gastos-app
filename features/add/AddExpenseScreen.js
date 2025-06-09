import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { CATEGORIES_GASTOS, CATEGORIES_INGRESOS } from '../../shared/constants/constants';
import TabSelector from '../../shared/components/TabSelector';

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tab, setTab] = useState('GASTOS');
  const [note, setNote] = useState('');

  const categories = tab === 'GASTOS' ? CATEGORIES_GASTOS : CATEGORIES_INGRESOS;

  const handleAddExpense = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }
    if (!category.trim()) {
      alert('Por favor ingresa una categoría.');
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date: date.toISOString(),
      type: tab,
      note
    };

    try {
      const stored = await AsyncStorage.getItem('expenses');
      const expenses = stored ? JSON.parse(stored) : [];
      expenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      navigation.navigate('Overview'); // Navegar a una pantalla tras agregar el gasto
    } catch (e) {
      console.error('Error al guardar:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Añadir Gasto o Ingreso</Text>

      <TabSelector tab={tab} setTab={setTab}/>

      <TextInput style={styles.input} placeholder="Cantidad (€)" value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una categoría" value="" />
          {categories.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Notas"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>Fecha: {date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Button title="Agregar" onPress={handleAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#222'
  },
  container: { flex: 1, padding: 20 },
  pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  marginBottom: 12
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 5
  },
  dateText: {
    marginBottom: 12,
    color: '#333',
    fontSize: 16
  }
});
