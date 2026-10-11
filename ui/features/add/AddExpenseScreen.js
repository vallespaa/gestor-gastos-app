import { useState } from 'react';
import { useFinancial } from '../../../shared/context/FinancialContext';
import { useCategories } from '../../../shared/context/CategoriesContext';
import { useAccounts } from '../../../shared/context/AccountsContext';
import {
  evaluateExpression,
  formatAmount,
  isOperator,
} from '../../../shared/utils/calculator';
import { useAddTransactionHeader } from './hooks/useAddTransactionHeader';
import { Alert, View, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView';
import TabSelector from '../../components/TabSelector';
import TransactionOptions from '../../components/TransactionOptions';
import CategorySelector from '../../components/CategorySelector';
import KeyPad from '../../components/KeyPad';
import DisplayAmount from '../../components/DisplayAmount';

export default function AddExpenseScreen({ navigation }) {
  const [tab, setTab] = useState('GASTOS');
  const { addTransaction } = useFinancial();
  const { getCategories, getCategoryById } = useCategories();
  const { accounts, getAccountById } = useAccounts();

  const categories = getCategories(tab);

  const [expression, setExpression] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const amount = evaluateExpression(expression);

  const handlePress = (input) => {
    // Borrar
    if (input === '⌫') {
      setExpression(expression.slice(0, -1));
      return;
    }

    // Operador: reemplazar si último ya es operador
    if (isOperator(input)) {
      if (expression === '') return; // no permitir operador al inicio
      const lastChar = expression.slice(-1);
      setExpression(
        isOperator(lastChar)
          ? expression.slice(0, -1) + input
          : expression + input,
      );
      return;
    }

    // Coma: solo una por número
    if (input === ',') {
      const currentNumber = expression.split(/[+\-*/]/).pop();
      if (currentNumber.includes(',')) return;
    }

    setExpression(expression + input);
  };

  const handleAddExpense = async () => {
    const category = getCategoryById(categoryId);
    const account = getAccountById(accountId);

    if (amount === null || amount <= 0) {
      alert('Por favor ingresa una cantidad mayor que 0.');
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
      amount,
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
      <View style={styles.container}>
        <DisplayAmount
          amount={amount === null ? '—' : formatAmount(amount)}
          expression={expression}
        />
      </View>
      <CategorySelector
        categories={categories}
        selectedCategory={categoryId}
        onCategoryChange={setCategoryId}
      />
      <TransactionOptions
        date={date}
        setDate={setDate}
        selectedAccount={accountId}
        setSelectedAccount={setAccountId}
        note={note}
        onAddNote={setNote}
        accounts={accounts}
      />
      <KeyPad onKeyPress={handlePress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
