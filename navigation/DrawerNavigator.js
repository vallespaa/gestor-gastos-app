import { createDrawerNavigator } from '@react-navigation/drawer';
import OverviewScreen from '../features/overview/OverviewScreen';
import AddExpenseScreen from '../features/add/AddExpenseScreen';
import TransactionsScreen from '../features/transactions/TransactionsScreen';
import ExportScreen from '../features/export/ExportScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="Overview" component={OverviewScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
			<Drawer.Screen name="Add" component={AddExpenseScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="add" size={24} color={color} /> }} />
			<Drawer.Screen name="Transactions" component={TransactionsScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="list" size={24} color={color} /> }} />
			<Drawer.Screen name="Exportar Datos" component={ExportScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="share" size={24} color={color} /> }} />
		</Drawer.Navigator>
	);
}
