import { useLayoutEffect } from 'react';
import { useFinancial } from '../../../shared/context/FinancialContext';
import { useAccounts } from '../../../shared/context/AccountsContext';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import ThemedView from '../../components/ThemedView';
import AccountCard from './components/AccountCard';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

export default function AccountsScreen({ navigation }) {
  const { accounts } = useAccounts();
  const { getAccountBalance } = useFinancial();

  const totalBalance = accounts.reduce(
    (acc, account) => acc + getAccountBalance(account.id),
    0,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.headerButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={() => navigation.navigate('TransferForm')}
          >
            <Ionicons name="swap-horizontal" size={22} color={COLORS.black} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.headerButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={() => navigation.navigate('AccountForm')}
          >
            <Ionicons name="add" size={22} color={COLORS.black} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ThemedView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>TOTAL:</Text>
        <Text style={styles.totalValue}>{totalBalance.toFixed(2)} €</Text>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const balance = getAccountBalance(item.id);
          return (
            <AccountCard
              account={item}
              balance={balance}
              onPress={() =>
                navigation.navigate('AccountForm', { account: item })
              }
            />
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xl,
  },
  totalLabel: {
    color: COLORS.gray,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
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
