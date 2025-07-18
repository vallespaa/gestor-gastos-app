import { useState, useEffect } from 'react';
import { useTransactions } from '../../../../shared/context/TransactionsContext';
import { useCategories } from '../../../../shared/context/CategoriesContext';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable } from 'react-native';
import CategoryPicker from '../../../components/CategoryPicker';
import DateSelector from '../../../components/DateSelector';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

const screenHeight = Dimensions.get('window').height;

export default function TransactionDetailModal({ isVisible, onClose, transaction }) {
	const { editTransaction, removeTransaction } = useTransactions();
  const { getCategories, getCategoryById } = useCategories();

  const [categories, setCategories] = useState([]);
	const [amount, setAmount] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState('');

	useEffect(() => {
		if (transaction) {
			setCategories(getCategories(transaction.type));
			setAmount(String(transaction.amount));
      setCategoryId(transaction.category);
			setDate(new Date(transaction.date));
			setNote(transaction.note || '');
		}
	}, [transaction]);

	const handleUpdate = async () => {
    const category = getCategoryById(categoryId);

		if (!amount || isNaN(parseFloat(amount))) {
			alert('Por favor ingresa una cantidad válida.');
			return;
		}
		
    if (!category) {
      alert('Por favor selecciona una categoría válida.');
      return;
    }

		const updated = {
			...transaction,
			amount: parseFloat(amount),
			category: category.id,
			date: date.toISOString(),
			note
		};
		await editTransaction(updated);
		onClose();
	};

	const handleDelete = async () => {
		await removeTransaction(transaction.id);
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

					<CategoryPicker
						categories={categories}
						selectedCategory={categoryId}
						onCategoryChange={setCategoryId}
					/>

					<DateSelector date={date} setDate={setDate} />

					<TextInput
						style={[styles.input, styles.notesInput]}
						placeholder="Notas"
						value={note}
						onChangeText={setNote}
						multiline
						textAlignVertical="top"
					/>
				</View>

				<View style={styles.buttonRow}>
					<Pressable style={styles.updateButton} onPress={handleUpdate}>
						<Text style={styles.updateText}>ACTUALIZAR TRANSACCIÓN</Text>
					</Pressable>

					<Pressable style={styles.deleteButton} onPress={handleDelete}>
						<MaterialIcons name="delete" size={24} color={COLORS.white} />
					</Pressable>
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
	buttonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: SPACING.lg,
	},
	updateButton: {
		flex: 1,
		backgroundColor: COLORS.primary,
		paddingVertical: SPACING.md,
		borderRadius: BORDER_RADIUS.md,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: SPACING.sm,
	},
	updateText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 0.5,
	},
	deleteButton: {
		width: 50,
		height: 50,
		backgroundColor: "#F44336",
		paddingVertical: SPACING.md,
		borderRadius: BORDER_RADIUS.md,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
