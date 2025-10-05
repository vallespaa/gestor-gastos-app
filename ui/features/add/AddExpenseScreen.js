import { useState } from 'react';
import { useFinancial } from '../../../shared/context/FinancialContext';
import { useCategories } from '../../../shared/context/CategoriesContext';
import { useAccounts } from '../../../shared/context/AccountsContext';
import { useAddTransactionHeader } from './hooks/useAddTransactionHeader';
import { TextInput, StyleSheet, Alert } from 'react-native';
import ThemedView from '../../components/ThemedView';
import TabSelector from '../../components/TabSelector';
import CategorySelector from '../../components/CategorySelector';
import AccountPicker from '../../components/AccountPicker';
import DateSelector from '../../components/DateSelector';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';
import * as math from 'mathjs';
import KeyPad from '../../components/KeyPad';

export default function AddExpenseScreen({ navigation }) {
  const [tab, setTab] = useState('GASTOS');
  const { addTransaction } = useFinancial();
  const { getCategories, getCategoryById } = useCategories();
  const { accounts, getAccountById } = useAccounts();

  const categories = getCategories(tab);

  const [amount, setAmount] = useState('0');
  const [expression, setExpression] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isOperator = (input) => ['+', '-', '*', '/'].includes(input);

  const evaluateExpression = (exp) => {
    if (!exp) return '0';

    // Limpiar operadores al final
    let cleanExp = exp;
    while (isOperator(cleanExp.slice(-1))) {
      cleanExp = cleanExp.slice(0, -1);
    }

    try {
      const result = math.evaluate(cleanExp || '0');
      return result.toString();
    } catch {
      return '0';
    }
  };

  const handlePress = (input) => {
    // Borrar
    if (input === '⌫') {
      const newExp = expression.slice(0, -1);
      setExpression(newExp);
      setAmount(evaluateExpression(newExp));
      return;
    }

    // Operador: reemplazar si último ya es operador
    if (isOperator(input)) {
      if (expression === '') return; // no permitir operador al inicio
      const lastChar = expression.slice(-1);
      const newExp = isOperator(lastChar)
        ? expression.slice(0, -1) + input
        : expression + input;
      setExpression(newExp);
      setAmount(evaluateExpression(newExp));
      return;
    }

    // Número o coma
    const newExp = expression + input;
    setExpression(newExp);
    setAmount(evaluateExpression(newExp));
  };

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
      setAmount('0');
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
    <ThemedView withPadding={false}>
      <TabSelector tab={tab} setTab={handleTabChange} />

      <TextInput
        style={styles.input}
        placeholder="Cantidad (€)"
        value={amount}
        editable={false}
      />

      <CategorySelector
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

      <KeyPad onKeyPress={handlePress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.md,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
});
