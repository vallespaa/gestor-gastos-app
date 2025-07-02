import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import OverviewScreen from '../features/overview/OverviewScreen';
import AddExpenseScreen from '../features/add/AddExpenseScreen';
import TransactionsScreen from '../features/transactions/TransactionsScreen';
import ImportExportScreen from '../features/export/ImportExportScreen';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONT_SIZES } from '../shared/styles/global'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<View style={{ padding: SPACING.lg }}>
				<Text style={{ fontWeight: 'bold', fontSize: FONT_SIZES.lg }}>Gestor de Gastos</Text>
			</View>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
}


export default function DrawerNavigator() {
	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawerContent {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Drawer.Screen
				name="Día"
				component={OverviewScreen}
				initialParams={{ period: "DAY" }}
			/>
			<Drawer.Screen
				name="Semana"
				component={OverviewScreen}
				initialParams={{ period: "WEEK" }}
			/>
			<Drawer.Screen
				name="Mes"
				component={OverviewScreen}
				initialParams={{ period: "MONTH" }}
			/>
			<Drawer.Screen
				name="Año"
				component={OverviewScreen}
				initialParams={{ period: "YEAR" }}
			/>
			<Drawer.Screen
				name="Add"
				component={AddExpenseScreen}
				options={{ drawerIcon: ({ color }) => <Ionicons name="add" size={24} color={color} /> }}
			/>
			<Drawer.Screen
				name="Transactions"
				component={TransactionsScreen}
				options={{ drawerIcon: ({ color }) => <Ionicons name="list" size={24} color={color} /> }}
			/>
			<Drawer.Screen
				name="Importar / Exportar"
				component={ImportExportScreen}
				options={{ drawerIcon: ({ color }) => <Ionicons name="repeat" size={24} color={color} /> }}
			/>
		</Drawer.Navigator>
	);
}
