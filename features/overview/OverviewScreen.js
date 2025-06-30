import { useState } from 'react';
import { useTransactions } from '../../shared/context/TransactionsContext';
import { useFilteredTransactions } from '../../shared/hooks/useFilteredTransactions';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../../shared/components/Header';
import TabSelector from '../../shared/components/TabSelector';
import CategorySummary from './components/CategorySummary';
import { COLORS, SPACING } from '../../shared/styles/global';

export default function OverviewScreen({ period = 'MONTH' }) {
	const [tab, setTab] = useState('GASTOS');
	const { transactions } = useTransactions();
	const filteredTransactions = useFilteredTransactions(transactions, tab, period);

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

			<CategorySummary transactions={filteredTransactions} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
		backgroundColor: COLORS.white,
	}
});
