import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionsScreen() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem('expenses');
        const parsed = stored ? JSON.parse(stored) : [];
        // Ordenar por fecha descendente
        parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(parsed);
      } catch (e) {
        console.error('Error cargando gastos:', e);
      }
    };

    const unsubscribe = loadExpenses();
    return () => unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.amount}>€{item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transacciones</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay transacciones registradas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  name: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 12, color: '#666' },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
});
