import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import AddExpenseScreen from '../features/add/AddExpenseScreen';
import { COLORS } from '../../shared/styles/global.js';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.black,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddExpenseScreen}
        options={{
          title: 'Añadir',
        }}
      />
    </Stack.Navigator>
  );
}
