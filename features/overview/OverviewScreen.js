import { useState } from 'react';
import { useTransactions } from '../../shared/context/TransactionsContext';
import { useFilteredTransactions } from '../../shared/hooks/useFilteredTransactions';
import { useExpenseSummary } from './hooks/useExpenseSummary';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../shared/components/Header';
import TabSelector from '../../shared/components/TabSelector';
import CategoryPieChart from './components/CategoryPieChart';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../shared/styles/global';

export default function OverviewScreen({ period = 'MONTH' }) {
	const [tab, setTab] = useState('GASTOS');
	const { transactions } = useTransactions();
	const filteredTransactions = useFilteredTransactions(transactions, tab, period);
	const { total, categories } = useExpenseSummary(filteredTransactions);

	const balance = transactions.reduce((acc, item) => {
		if (item.type === 'INGRESOS') {
			return acc + parseFloat(item.amount);
		}
		return acc - parseFloat(item.amount);
	}, 0);

	return (
		<ScrollView contentContainerStyle={styles.container}>

			<Header amount={balance.toFixed(2)} />

			<TabSelector tab={tab} setTab={setTab} />

			<CategoryPieChart categories={categories} />

			<View style={styles.summary}>
				{categories.map((cat) => (
					<View key={cat.name} style={styles.summaryRow}>
						<Text style={styles.catName}>{cat.name}</Text>
						<View style={[styles.bar, { width: `${(cat.amount / total) * 100}%`, backgroundColor: cat.color }]} />
						<Text style={styles.catAmount}>{cat.amount.toFixed(2)}€</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
		backgroundColor: COLORS.white,
	},
	summary: {
		marginTop: SPACING.xl,
		width: '100%',
	},
	summaryRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	catName: {
		flex: 1,
		fontSize: FONT_SIZES.sm,
	},
	bar: {
		height: 10,
		borderRadius: BORDER_RADIUS.sm,
		marginHorizontal: SPACING.sm,
		flex: 2,
	},
	catAmount: {
		fontSize: FONT_SIZES.sm,
		flex: 1,
		textAlign: 'right',
	},
});
