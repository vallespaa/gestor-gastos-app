import { useState } from 'react';
import { useFinancial } from '../../../shared/context/FinancialContext';
import { useCategories } from '../../../shared/context/CategoriesContext';
import { useAccounts } from '../../../shared/context/AccountsContext';
import { useAddTransactionHeader } from './hooks/useAddTransactionHeader.js';
import { TextInput, StyleSheet, Alert } from 'react-native';
import ThemedView from '../../components/ThemedView';
import TabSelector from '../../components/TabSelector';
import CategoryPicker from '../../components/CategoryPicker';
import AccountPicker from '../../components/AccountPicker';
import DateSelector from '../../components/DateSelector';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

export default function AddExpenseScreen({ navigation }) {
  const [tab, setTab] = useState('GASTOS');
  const { addTransaction } = useFinancial();
  const { getCategories, getCategoryById } = useCategories();
  const { accounts, getAccountById } = useAccounts();

  const categories = getCategories(tab);

  const [amount, setAmount] = useState('0');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddExpense = async () => {
    const category = getCategoryById(categoryId);
    const account = getAccountById(accountId);

    if (!amount || isNaN(parseFloat(amount))) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }

    if (!category) {
      alert('Por favor selecciona una categoría válida.');
      return;
    }

    if (!account) {
      alert('Por favor selecciona una cuenta válida.');
      return;
    }

    setIsLoading(true);

    const newExpense = {
      id: String(Date.now()),
      amount: parseFloat(amount),
      type: category.type,
      category: category.id,
      account: account.id,
      date: date.toISOString(),
      note,
    };
    try {
      await addTransaction(newExpense);
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar la transacción.');
    } finally {
      setAmount('');
      setCategoryId('');
      setAccountId('');
      setDate(new Date());
      setNote('');
      setIsLoading(false);
    }
  };

  useAddTransactionHeader({
    navigation,
    isLoading,
    onSave: handleAddExpense,
  });

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCategoryId('');
  };

  return (
    <ThemedView>
      <TabSelector tab={tab} setTab={handleTabChange} />

      <TextInput
        style={styles.input}
        placeholder="Cantidad (€)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <CategoryPicker
        categories={categories}
        selectedCategory={categoryId}
        onCategoryChange={setCategoryId}
      />

      <AccountPicker
        accounts={accounts}
        selectedAccount={accountId}
        onAccountChange={setAccountId}
      />

      <DateSelector date={date} setDate={setDate} />

      <TextInput
        style={styles.input}
        placeholder="Notas"
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
});
