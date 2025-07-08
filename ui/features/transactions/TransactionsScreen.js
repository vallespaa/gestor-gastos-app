import { useState } from 'react';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import TabSelector from '../../components/TabSelector';
import PeriodTabs from '../../components/PeriodTabs';
import TransactionsList from './components/TransactionsList';
import { COLORS, SPACING } from '../../../shared/styles/global';

export default function TransactionsScreen() {
	const [tab, setTab] = useState('GASTOS');
	const [period, setPeriod] = useState('MONTH');
	const { transactions } = useTransactions();

	return (
		<View style={styles.container}>
			<Header title={"Transacciones"} />
			<TabSelector tab={tab} setTab={setTab} />
			<PeriodTabs period={period} setPeriod={setPeriod} />
			<TransactionsList transactions={transactions} tab={tab} period={period} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
		backgroundColor: COLORS.white
	}
});
