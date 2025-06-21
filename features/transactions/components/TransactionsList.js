import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFilteredTransactions } from "../../../shared/hooks/useFilteredTransactions";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

export default function TransactionsList({ transactions, tab, period }) {
	const filteredTransactions = useFilteredTransactions(transactions, tab, period);

	const sortedTransactions = filteredTransactions
		.slice()
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<View style={{ flex: 1 }}>
				<Text style={styles.category}>{item.category}</Text>
				<Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
				{item.note ? <Text style={styles.note}>{item.note}</Text> : null}
			</View>
			<Text style={styles.amount}>
				{item.type === 'GASTOS' ? '-' : ''}€{item.amount.toFixed(2)}
			</Text>
		</View>
	);

	return (
		<FlatList
			data={sortedTransactions}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderItem}
			ListEmptyComponent={<Text style={styles.empty}>No hay transacciones registradas.</Text>}
		/>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: SPACING.sm,
		marginVertical: SPACING.xs,
		backgroundColor: COLORS.lightGray,
		borderRadius: BORDER_RADIUS.sm,
	},
	category: {
		fontSize: FONT_SIZES.md,
		fontWeight: '600'
	},
	date: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.gray
	},
	note: {
		fontSize: FONT_SIZES.md,
		color: COLORS.gray,
		fontStyle: 'italic',
		marginTop: SPACING.xs
	},
	amount: {
		fontSize: FONT_SIZES.md,
		fontWeight: 'bold',
		color: COLORS.primary,
		marginLeft: SPACING.sm
	},
	empty: {
		textAlign: 'center',
		marginTop: SPACING.md,
		fontSize: FONT_SIZES.md,
		color: COLORS.gray
	}
});