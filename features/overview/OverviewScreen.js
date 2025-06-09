import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const OverviewScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tab, setTab] = useState('GASTOS');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem('expenses');
        const parsed = stored ? JSON.parse(stored) : [];
        const currentDate = new Date();

        const filtered = parsed.filter(item => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear() &&
            item.type && item.type.toUpperCase() === tab 
          );
        });

        const totalAmount = filtered.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        setTotal(totalAmount);

        const categoryMap = {};
        filtered.forEach(item => {
          categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
        });

        const chartData = Object.entries(categoryMap).map(([category, amount], index) => ({
          name: category,
          amount,
          color: getColor(index),
          legendFontColor: '#333',
          legendFontSize: 14,
        }));

        setCategories(chartData);
        setExpenses(parsed);
      } catch (error) {
        console.log('Error al cargar gastos:', error);
      }
    };

    fetchExpenses();
  }, [tab]);

  const getColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F77825'];
    return colors[index % colors.length];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>${total.toFixed(2)}</Text>
    
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'GASTOS' && styles.tabActive]}
          onPress={() => setTab('GASTOS')}
        >
          <Text style={tab === 'GASTOS' ? styles.tabTextActive : styles.tabText}>GASTOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'INGRESO' && styles.tabActive]}
          onPress={() => setTab('INGRESO')}
        >
          <Text style={tab === 'INGRESO' ? styles.tabTextActive : styles.tabText}>INGRESO</Text>
        </TouchableOpacity>
      </View>

      {categories.length > 0 ? (
        <PieChart
          data={categories}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No hay datos para mostrar.</Text>
      )}

      <View style={styles.summary}>
        {categories.map((cat, idx) => (
          <View key={idx} style={styles.summaryRow}>
            <Text style={styles.catName}>{cat.name}</Text>
            <View style={[styles.bar, { width: `${(cat.amount / total) * 100}%`, backgroundColor: cat.color }]} />
            <Text style={styles.catAmount}>€{cat.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 20,
    marginVertical: 15,
  },
  container: { flex: 1, padding: 20 },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 30,
    width: '100%',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  catName: {
    flex: 1,
    fontSize: 14,
  },
  bar: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 2,
  },
  catAmount: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});
