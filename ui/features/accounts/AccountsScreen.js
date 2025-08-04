import { useTransactions } from '../../../shared/context/TransactionsContext';
import { useAccounts } from '../../../shared/context/AccountsContext';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView';
import AccountCard from './components/AccountCard';
import { COLORS, FONT_SIZES, SPACING,  } from '../../../shared/styles/global';

export default function AccountsScreen() {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();

  const totalBalance = accounts.reduce(
    (acc, account) => acc + getAccountBalance(account.id, transactions),
    0
  );

  return (
    <ThemedView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>TOTAL:</Text>
        <Text style={styles.totalValue}>{totalBalance.toFixed(2)} €</Text>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const balance = getAccountBalance(item.id, transactions);
          return <AccountCard account={item} balance={balance} />;
        }}
      />

    </ThemedView>
  );
}

function getAccountBalance(accountId, transactions) {
  return transactions
    .filter(tx => tx.account === accountId)
    .reduce((acc, tx) => {
      const amount = parseFloat(tx.amount) || 0;
      return tx.type === 'INGRESOS' ? acc + amount : acc - amount;
    }, 0);
}

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xl,
  },
  totalLabel: {
    color: COLORS.gray,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600'
  },
  totalValue: {
    color: COLORS.black,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginLeft: SPACING.xs, 
  },
  list: {
    gap: SPACING.md, 
  },
});
