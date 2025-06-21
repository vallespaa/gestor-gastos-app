import { useState } from 'react';
import { useExpenses } from '../../shared/hooks/useExpenses';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIES_GASTOS, CATEGORIES_INGRESOS } from '../../shared/constants/constants';
import TabSelector from '../../shared/components/TabSelector';
import Header from '../../shared/components/Header';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../shared/styles/global';

export default function AddExpenseScreen({ navigation }) {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [tab, setTab] = useState('GASTOS');
	const { addExpense } = useExpenses();
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState('');

	const categories = tab === 'GASTOS' ? CATEGORIES_GASTOS : CATEGORIES_INGRESOS;

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

		await addExpense(newExpense);
		setAmount('');
		setCategory('');
		setDate(new Date());
		setNote('');
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Header title={"Añadir"} />

			<TabSelector tab={tab} setTab={setTab} />

			<TextInput style={styles.input} placeholder="Cantidad (€)" value={amount} onChangeText={setAmount} keyboardType="numeric" />

			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={category}
					onValueChange={(itemValue) => setCategory(itemValue)}
					style={styles.picker}
				>
					<Picker.Item label="Selecciona una categoría" value="" />
					{categories.map(cat => (
						<Picker.Item key={cat} label={cat} value={cat} />
					))}
				</Picker>
			</View>

			<TextInput
				style={styles.input}
				placeholder="Notas"
				value={note}
				onChangeText={setNote}
				multiline
			/>

			<TouchableOpacity onPress={() => setShowDatePicker(true)}>
				<Text style={styles.dateText}>Fecha: {date.toDateString()}</Text>
			</TouchableOpacity>

			{showDatePicker && (
				<DateTimePicker
					value={date}
					mode="date"
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={(e, selectedDate) => {
						setShowDatePicker(false);
						if (selectedDate) setDate(selectedDate);
					}}
				/>
			)}

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
	pickerContainer: {
		borderWidth: 1,
		borderColor: COLORS.gray,
		borderRadius: BORDER_RADIUS.md,
		marginBottom: SPACING.md
	},
	picker: {
		height: SPACING.xl,
		width: '100%',
	},
	input: {
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		marginBottom: SPACING.md,
		padding: SPACING.sm,
		borderRadius: BORDER_RADIUS.md
	},
	dateText: {
		marginBottom: SPACING.sm,
		color: COLORS.black,
		fontSize: FONT_SIZES.md
	}
});
