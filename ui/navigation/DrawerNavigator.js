import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import OverviewScreen from '../features/overview/OverviewScreen';
import TransactionsScreen from '../features/transactions/TransactionsScreen';
import SettingsScreen from '../features/settings/SettingsScreen.js';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../shared/styles/global'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestor de Gastos</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.spacer} />

      <DrawerItem
        label="Ajustes"
        onPress={() => props.navigation.navigate('Ajustes')}
        icon={({ color, size }) => (
          <Ionicons name="settings-outline" color={color} size={size} />
        )}
      />
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
				name="Lista"
				component={TransactionsScreen}
				options={{ drawerIcon: ({ color }) => <Ionicons name="list" size={24} color={color} /> }}
			/>
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
				name="Ajustes"
				component={SettingsScreen}
				options={{ 
					drawerItemStyle: { display: 'none' }
				}}
			/>
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
  },
  title: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.lg,
  },
  spacer: {
    flex: 1,
  },
});
