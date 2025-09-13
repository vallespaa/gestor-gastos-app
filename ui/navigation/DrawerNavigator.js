import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import OverviewScreen from '../features/overview/OverviewScreen';
import TransactionsScreen from '../features/transactions/TransactionsScreen';
import SettingsScreen from '../features/settings/SettingsScreen.js';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/styles/global'

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
          <MaterialIcons name="settings" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Mes"
      screenOptions={{
        headerTintColor: COLORS.black,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerShadowVisible: false
      }}
    >
			<Drawer.Screen
				name="Lista"
				component={TransactionsScreen}
				options={{ drawerIcon: ({ color }) => <MaterialIcons name="view-agenda" size={24} color={color} /> }}
			/>
			<Drawer.Screen
				name="Día"
				component={OverviewScreen}
				initialParams={{ period: "DAY" }}
				options={{ drawerIcon: ({ color }) => <MaterialIcons name="calendar-view-day" size={24} color={color} /> }}			/>
			<Drawer.Screen
				name="Semana"
				component={OverviewScreen}
				initialParams={{ period: "WEEK" }}
				options={{ drawerIcon: ({ color }) => <MaterialIcons name="calendar-view-week" size={24} color={color} /> }}
			/>
			<Drawer.Screen
				name="Mes"
				component={OverviewScreen}
				initialParams={{ period: "MONTH" }}
				options={{ drawerIcon: ({ color }) => <MaterialIcons name="calendar-view-month" size={24} color={color} /> }}
			/>
			<Drawer.Screen
				name="Año"
				component={OverviewScreen}
				initialParams={{ period: "YEAR" }}
				options={{ drawerIcon: ({ color }) => <MaterialIcons name="calendar-month" size={24} color={color} /> }}
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
