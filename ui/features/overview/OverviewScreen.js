import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFinancial } from '../../../shared/context/FinancialContext';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView'
import TabSelector from '../../components/TabSelector';
import CategorySummary from './components/CategorySummary';
import FloatingAddButton from './components/FloatingAddButton';
import { FONT_SIZES } from '../../../shared/styles/global';

export default function OverviewScreen({ route }) {
	const navigation = useNavigation();

	const { period } = route.params;
	const [tab, setTab] = useState('GASTOS');
	const { transactions, totalBalance } = useFinancial();

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}>{totalBalance.toFixed(2)}€</Text>
        </View>
      )
    })
  }, [totalBalance, navigation]);


	return (
    <ThemedView>
      <ScrollView style={styles.scrollView}>
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
  headerTitle: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.xl,
  }
});
