import { useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { useFinancial } from '../../../shared/context/FinancialContext';
import { useTransactions } from './hooks/useTransactions';
import ThemedView from '../../components/ThemedView';
import TransactionsList from './components/TransactionsList';
import FloatingAddButton from '../overview/components/FloatingAddButton';
import { FONT_SIZES } from "../../../shared/styles/global";

export default function TransactionsScreen({ navigation }) {
  const { totalBalance } = useFinancial();
  const { sections } = useTransactions();

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}>{totalBalance.toFixed(2)}€</Text>
        </View>
      )
    });
  }, [totalBalance, navigation]);

  return (
    <ThemedView withPadding={false}>
      <TransactionsList sections={sections}/>
      <FloatingAddButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
  },
});
