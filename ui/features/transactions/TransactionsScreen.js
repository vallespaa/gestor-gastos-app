import { useState } from 'react';
import { useFinancial } from '../../../shared/context/FinancialContext';
import ThemedView from '../../components/ThemedView'
import TabSelector from '../../components/TabSelector';
import PeriodTabs from '../../components/PeriodTabs';
import TransactionsList from './components/TransactionsList';

export default function TransactionsScreen() {
	const [tab, setTab] = useState('GASTOS');
	const [period, setPeriod] = useState('MONTH');
	const { transactions } = useFinancial();

	return (
		<ThemedView>
			<TabSelector tab={tab} setTab={setTab} />
			<PeriodTabs period={period} setPeriod={setPeriod} />
			<TransactionsList transactions={transactions} tab={tab} period={period} />
		</ThemedView>
	);
}
