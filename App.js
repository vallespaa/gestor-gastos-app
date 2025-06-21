import { TransactionsProvider } from './shared/context/TransactionsContext';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
	return (
		<TransactionsProvider>
			<NavigationContainer>
				<BottomTabs />
			</NavigationContainer>
		</TransactionsProvider>
	);
};
