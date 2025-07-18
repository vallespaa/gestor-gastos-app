import { useState } from 'react';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { useCategories } from '../../../shared/context/CategoriesContext';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import TabSelector from '../../components/TabSelector';
import CategoryPicker from '../../components/CategoryPicker';
import DateSelector from '../../components/DateSelector';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

export default function AddExpenseScreen() {
	const [tab, setTab] = useState('GASTOS');
	const { addTransaction } = useTransactions();
  const { getCategories } = useCategories();

	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState('');

  const categories = getCategories(tab);
	
  const handleAddExpense = async () => {
		if (!amount || isNaN(parseFloat(amount))) {
			alert('Por favor ingresa una cantidad válida.');
			return;
		}
		if (!category.trim()) {
			alert('Por favor ingresa una categoría.');
			return;
		}

		const newExpense = {
			id: Date.now(),
			amount: parseFloat(amount),
			category,
			date: date.toISOString(),
			type: tab,
			note
		};

		await addTransaction(newExpense);
		setAmount('');
		setCategory('');
		setDate(new Date());
		setNote('');
	};

	const handleTabChange = (newTab) => {
		setTab(newTab);
		setCategory('');
	};

	return (
		<View style={styles.container}>
			<Header title={"Añadir"} />

			<TabSelector tab={tab} setTab={handleTabChange} />

			<TextInput style={styles.input} placeholder="Cantidad (€)" value={amount} onChangeText={setAmount} keyboardType="numeric" />

			<CategoryPicker
				categories={categories}
				selectedCategory={category}
				onCategoryChange={setCategory}
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
