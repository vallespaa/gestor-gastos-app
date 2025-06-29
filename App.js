import 'react-native-gesture-handler';

import { TransactionsProvider } from './shared/context/TransactionsContext';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
	return (
		<TransactionsProvider>
			<NavigationContainer>
				<DrawerNavigator />
			</NavigationContainer>
		</TransactionsProvider>
	);
};
