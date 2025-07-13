import 'react-native-gesture-handler';

import { TransactionsProvider } from './shared/context/TransactionsContext';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import DrawerNavigator from './ui/navigation/DrawerNavigator';
=======
import RootNavigator from './navigation/RootNavigator';
>>>>>>> 92f9e6e (improve navigation)

export default function App() {
	return (
		<TransactionsProvider>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</TransactionsProvider>
	);
};
