import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFinancial } from '../../../shared/context/FinancialContext';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView'
import TabSelector from '../../components/TabSelector';
import CategorySummary from './components/CategorySummary';
import FloatingAddButton from './components/FloatingAddButton';
import { SPACING, FONT_SIZES } from '../../../shared/styles/global';

export default function OverviewScreen({ route }) {
	const navigation = useNavigation();

	const { period } = route.params;
	const [tab, setTab] = useState('GASTOS');
	const { transactions } = useFinancial();

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
          <Text style={styles.headerTitle}>{balance.toFixed(2)}€</Text>
        </View>
      )
    })
  }, [balance, navigation]);


	return (
    <ThemedView>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <TabSelector tab={tab} setTab={setTab} />

        <CategorySummary transactions={transactions} tab={tab} period={period} />
      </ScrollView>

      <FloatingAddButton />
    </ThemedView>
	);
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.xl,
  }
});
