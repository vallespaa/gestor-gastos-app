import { useState } from 'react';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { useCategories } from '../../../shared/context/CategoriesContext';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TabSelector from '../../components/TabSelector';
import CategoryPicker from '../../components/CategoryPicker';
import DateSelector from '../../components/DateSelector';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

export default function AddExpenseScreen({ navigation }) {
	const [tab, setTab] = useState('GASTOS');
	const { addTransaction } = useTransactions();
  const { getCategories, getCategoryById } = useCategories();

	const [amount, setAmount] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState('');

  const categories = getCategories(tab);
	
  const handleAddExpense = async () => {
    const category = getCategoryById(categoryId);

		if (!amount || isNaN(parseFloat(amount))) {
			alert('Por favor ingresa una cantidad válida.');
			return;
		}

    if (!category) {
      alert('Por favor selecciona una categoría válida.');
      return;
    }

		const newExpense = {
			id: Date.now(),
			amount: parseFloat(amount),
			category: category.id,
			date: date.toISOString(),
			type: category.type,
			note
		};

		await addTransaction(newExpense);
		setAmount('');
		setCategoryId('');
		setDate(new Date());
		setNote('');
		navigation.goBack();
	};

	const handleTabChange = (newTab) => {
		setTab(newTab);
		setCategoryId('');
	};

	return (
		<View style={styles.container}>
			<TabSelector tab={tab} setTab={handleTabChange} />

			<TextInput style={styles.input} placeholder="Cantidad (€)" value={amount} onChangeText={setAmount} keyboardType="numeric" />

			<CategoryPicker
				categories={categories}
				selectedCategory={categoryId}
				onCategoryChange={setCategoryId}
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

			<Button title="Agregar" onPress={handleAddExpense} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
		backgroundColor: COLORS.white
	},
	input: {
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		marginBottom: SPACING.md,
		padding: SPACING.sm,
		borderRadius: BORDER_RADIUS.md
	}
});
