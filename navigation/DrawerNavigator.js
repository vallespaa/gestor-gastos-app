import { createDrawerNavigator } from '@react-navigation/drawer';
import OverviewScreen from '../features/overview/OverviewScreen';
import AddExpenseScreen from '../features/add/AddExpenseScreen';
import TransactionsScreen from '../features/transactions/TransactionsScreen';
import ExportScreen from '../features/export/ExportScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

	const DayOverview = () => <OverviewScreen period="DAY" />;
	const WeekOverview = () => <OverviewScreen period="WEEK" />;
	const MonthOverview = () => <OverviewScreen period="MONTH" />;
	const YearOverview = () => <OverviewScreen period="YEAR" />;

	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="Día" component={DayOverview} />
			<Drawer.Screen name="Semana" component={WeekOverview} />
			<Drawer.Screen name="Mes" component={MonthOverview} />
			<Drawer.Screen name="Año" component={YearOverview} />
			<Drawer.Screen name="Transactions" component={TransactionsScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="list" size={24} color={color} /> }} />
			<Drawer.Screen name="Exportar Datos" component={ExportScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="share" size={24} color={color} /> }} />
		</Drawer.Navigator>
	);
}
