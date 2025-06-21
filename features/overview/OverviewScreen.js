import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TabSelector from '../../shared/components/TabSelector';
import PeriodTabs from '../../shared/components/PeriodTabs';
import Header from '../../shared/components/Header';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../shared/styles/global';
import { CategoryPieChart } from './components/CategoryPieChart';
import { useTransactions } from '../../shared/context/TransactionsContext';
import { useFilteredTransactions } from '../../shared/hooks/useFilteredTransactions';
import { useExpenseSummary } from './hooks/useExpenseSummary';

const OverviewScreen = () => {
	const [tab, setTab] = useState('GASTOS');
	const [period, setPeriod] = useState('MONTH');
	const { transactions } = useTransactions();
	const filteredTransactions = useFilteredTransactions(transactions, tab, period);
	const { total, categories } = useExpenseSummary(filteredTransactions);

	return (
		<ScrollView contentContainerStyle={styles.container}>

			<Header amount={total.toFixed(2)} />

			<TabSelector tab={tab} setTab={setTab} />

			<PeriodTabs period={period} setPeriod={setPeriod} />

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

export default OverviewScreen;

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
