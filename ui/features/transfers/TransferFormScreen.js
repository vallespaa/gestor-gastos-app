import { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import { useAccounts } from '../../../shared/context/AccountsContext';
import { useFinancial } from '../../../shared/context/FinancialContext';
import ThemedView from '../../components/ThemedView';
import AccountPicker from '../../components/AccountPicker';
import DateSelector from '../../components/DateSelector';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

export default function TransferFormScreen({ navigation }) {
  const { addTransfer } = useFinancial();
  const { accounts, getAccountById } = useAccounts();

  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');

  const handleAddTransfer = async () => {
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);

    if (!amount || isNaN(parseFloat(amount))) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }

    if (!fromAccount || !toAccount) {
      alert('Selecciona dos cuentas válidas');
      return;
    }
    if (fromAccount === toAccount) {
      alert('La cuenta origen y destino deben ser diferentes');
      return;
    }

    const newTransfer = {
      id: String(Date.now()),
      fromAccountId: fromAccount.id,
      toAccountId: toAccount.id,
      amount: parseFloat(amount),
      date: date.toISOString(),
      note,
    };

    await addTransfer(newTransfer);
    setFromAccountId('');
    setToAccountId('');
    setAmount('');
    setDate(new Date());
    setNote('');
    navigation.goBack();
  };

  return (
    <ThemedView>
      <TextInput
        style={styles.amountInput}
        placeholder="Cantidad (€)"
        placeholderTextColor={COLORS.gray}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <AccountPicker
        accounts={accounts}
        selectedAccount={fromAccountId}
        onAccountChange={setFromAccountId}
      />

      <AccountPicker
        accounts={accounts}
        selectedAccount={toAccountId}
        onAccountChange={setToAccountId}
      />

      <DateSelector date={date} setDate={setDate} />

      <TextInput
        style={styles.noteInput}
        placeholder="Notas"
        placeholderTextColor={COLORS.gray}
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />

      <Button
        title="Agregar"
        color={COLORS.primary}
        onPress={handleAddTransfer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  amountInput: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginVertical: SPACING.md,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  noteInput: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
});
