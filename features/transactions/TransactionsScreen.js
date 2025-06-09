import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../shared/components/Header';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS} from '../../shared/styles/global';

export default function TransactionsScreen() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem('expenses');
        const parsed = stored ? JSON.parse(stored) : [];
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
      <View style={{ flex: 1 }}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      </View>
      <Text style={styles.amount}>
        {item.type === 'GASTOS' ? '-' : ''}€{item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={"Transacciones"}/>
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
  container: {
    flex: 1, 
    padding: SPACING.md,
    backgroundColor: COLORS.white
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.sm,
    marginVertical: SPACING.xs,
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.sm,
  },
  category: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600'
  },
  type: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  date: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray
  },
  note: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.darkGray,
    fontStyle: 'italic',
    marginTop: SPACING.xs
  },
  amount: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    marginLeft: SPACING.sm
  },
  empty: {
    textAlign: 'center',
    marginTop: SPACING.md,
    color: COLORS.lightGray
  },
});
