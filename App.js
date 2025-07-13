import 'react-native-gesture-handler';

import { TransactionsProvider } from './shared/context/TransactionsContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './ui/navigation/RootNavigator';

export default function App() {
	return (
		<TransactionsProvider>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</TransactionsProvider>
	);
};
