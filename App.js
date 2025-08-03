import 'react-native-gesture-handler';

import { TransactionsProvider } from './shared/context/TransactionsContext';
import { AccountsProvider } from './shared/context/AccountsContext';
import { CategoriesProvider } from './shared/context/CategoriesContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './ui/navigation/RootNavigator';

export default function App() {
	return (
		<TransactionsProvider>
      <AccountsProvider>
			  <CategoriesProvider>
				  <NavigationContainer>
					  <RootNavigator />
				  </NavigationContainer>
			  </CategoriesProvider>
      </AccountsProvider>
		</TransactionsProvider>
	);
};
