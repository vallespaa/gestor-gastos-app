import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ amount, title }) => {
  return (
    <View style={styles.container}>
      {amount !== undefined && (
        <Text style={styles.amount}>{amount}€</Text>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'fff',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    manginTop: 8,
  },
});

export default Header;
