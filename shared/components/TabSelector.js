import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../styles/global';

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
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});