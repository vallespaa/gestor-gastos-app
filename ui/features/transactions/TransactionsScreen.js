import { useState } from 'react';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import ThemedScrollView from '../../components/ThemedScrollView'
import TabSelector from '../../components/TabSelector';
import PeriodTabs from '../../components/PeriodTabs';
import TransactionsList from './components/TransactionsList';

export default function TransactionsScreen() {
	const [tab, setTab] = useState('GASTOS');
	const [period, setPeriod] = useState('MONTH');
	const { transactions } = useTransactions();

	return (
		<ThemedScrollView>
			<TabSelector tab={tab} setTab={setTab} />
			<PeriodTabs period={period} setPeriod={setPeriod} />
			<TransactionsList transactions={transactions} tab={tab} period={period} />
		</ThemedScrollView>
	);
}
