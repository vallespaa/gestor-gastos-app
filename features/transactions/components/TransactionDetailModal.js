import { useState, useEffect } from 'react';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIES_GASTOS, CATEGORIES_INGRESOS } from '../../../shared/constants/constants';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../shared/styles/global';

const screenHeight = Dimensions.get('window').height;

export default function TransactionDetailModal({ isVisible, onClose, transaction }) {
	const { editTransaction, deleteTransaction } = useTransactions();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [categories, setCategories] = useState([]);

	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState('');

	useEffect(() => {
		if (transaction) {
			setCategories(transaction.type === 'GASTOS' ? CATEGORIES_GASTOS : CATEGORIES_INGRESOS);

			setAmount(String(transaction.amount));
			setCategory(transaction.category);
			setDate(new Date(transaction.date));
			setNote(transaction.note || '');
		}
	}, [transaction]);


	const handleUpdate = () => {
		if (!amount || isNaN(parseFloat(amount))) {
			alert('Por favor ingresa una cantidad válida.');
			return;
		}
		if (!category.trim()) {
			alert('Por favor ingresa una categoría.');
			return;
		}

		const updated = {
			...transaction,
			amount: parseFloat(amount),
			category,
			date: date.toISOString(),
			note
		};
		editTransaction(updated);
		onClose();
	};

	const handleDelete = () => {
		deleteTransaction(transaction.id);
		onClose();
	};

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			onSwipeComplete={onClose}
			swipeDirection="down"
			style={styles.modal}
			propagateSwipe
		>
			<View style={styles.container}>
				<View style={styles.content}>

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

					<TextInput
						style={[styles.input, styles.notesInput]}
						placeholder="Notas"
						value={note}
						onChangeText={setNote}
						multiline
						textAlignVertical="top"
					/>
				</View>

				<View style={styles.buttonContainer}>
					<Button title="Actualizar transacción" onPress={handleUpdate} color={COLORS.primary} />
					<Button title="Eliminar" onPress={handleDelete} color={'crimson'} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-end',
		margin: 0
	},
	container: {
		height: screenHeight * 0.5,
		padding: SPACING.md,
		backgroundColor: COLORS.white,
		borderTopLeftRadius: BORDER_RADIUS.lg,
		borderTopRightRadius: BORDER_RADIUS.lg,
		justifyContent: 'space-between',
	},
	content: {
		flex: 1,
		paddingBottom: SPACING.md,
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
		marginBottom: SPACING.sm,
		padding: SPACING.sm,
		borderRadius: BORDER_RADIUS.md,
	},
	notesInput: {
		flex: 1,
		minHeight: 100,
	},
	dateText: {
		marginBottom: SPACING.sm,
		color: COLORS.black,
		fontSize: FONT_SIZES.md
	},
	buttonContainer: {
		marginTop: SPACING.lg,
		gap: SPACING.md
	}
});
