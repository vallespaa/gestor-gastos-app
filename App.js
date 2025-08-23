import 'react-native-gesture-handler';

import { FinancialProvider } from './shared/context/FinancialContext';
import { AccountsProvider } from './shared/context/AccountsContext';
import { CategoriesProvider } from './shared/context/CategoriesContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './ui/navigation/RootNavigator';

export default function App() {
	return (
		<FinancialProvider>
      <AccountsProvider>
			  <CategoriesProvider>
				  <NavigationContainer>
					  <RootNavigator />
				  </NavigationContainer>
			  </CategoriesProvider>
      </AccountsProvider>
		</FinancialProvider>
	);
};
