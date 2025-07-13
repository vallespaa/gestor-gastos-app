import { useState } from 'react';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import TabSelector from '../../components/TabSelector';
import CategorySummary from './components/CategorySummary';
<<<<<<< HEAD:ui/features/overview/OverviewScreen.js
import { COLORS, SPACING } from '../../../shared/styles/global';
=======
import FloatingAddButton from './components/FloatingAddButton.js';
import { COLORS, SPACING } from '../../shared/styles/global';
>>>>>>> 079bd7b (add floatingAddButton to the OverviewScreen):features/overview/OverviewScreen.js

export default function OverviewScreen({ route }) {
	const { period } = route.params;
	const [tab, setTab] = useState('GASTOS');
	const { transactions } = useTransactions();

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

			<CategorySummary transactions={transactions} tab={tab} period={period} />

      <FloatingAddButton />
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
