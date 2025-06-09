import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TabSelector({ tab, setTab }) {
  return (
    <View style={styles.tabContainer}>
        <TouchableOpacity
            style={[styles.tab, tab === 'GASTOS' && styles.tabActive]}
            onPress={() => setTab('GASTOS')}
        >
            <Text style={tab === 'GASTOS' ? styles.tabTextActive : styles.tabText}>GASTOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.tab, tab === 'INGRESOS' && styles.tabActive]}
            onPress={() => setTab('INGRESOS')}
        >
            <Text style={tab === 'INGRESOS' ? styles.tabTextActive : styles.tabText}>INGRESOS</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});