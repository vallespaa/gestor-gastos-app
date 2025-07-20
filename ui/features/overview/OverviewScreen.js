import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { View, Text } from 'react-native';
import ThemedScrollView from '../../components/ThemedScrollView'
import TabSelector from '../../components/TabSelector';
import CategorySummary from './components/CategorySummary';
import FloatingAddButton from './components/FloatingAddButton';

export default function OverviewScreen({ route }) {
	const navigation = useNavigation();

	const { period } = route.params;
	const [tab, setTab] = useState('GASTOS');
	const { transactions } = useTransactions();

	const balance = transactions.reduce((acc, item) => {
		if (item.type === 'INGRESOS') {
			return acc + parseFloat(item.amount);
		}
		return acc - parseFloat(item.amount);
	}, 0);

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: () => (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{balance.toFixed(2)}€</Text>
        </View>
      )
    })
  }, [balance, navigation]);


	return (
		<ThemedScrollView>
			<TabSelector tab={tab} setTab={setTab} />

			<CategorySummary transactions={transactions} tab={tab} period={period} />

      <FloatingAddButton />
		</ThemedScrollView>
	);
};
