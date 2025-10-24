import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import AddTransactionScreen from '../features/add/AddTransactionScreen';
import CategoriesScreen from '../features/categories/CategoriesScreen';
import CategoryFormScreen from '../features/categories/CategoryFormScreen';
import AccountsScreen from '../features/accounts/AccountsScreen';
import AccountFormScreen from '../features/accounts/AccountFormScreen';
import TransferFormScreen from '../features/transfers/TransferFormScreen';
import { COLORS } from '../../shared/styles/global';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.black,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          title: 'Añadir',
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Categorías',
        }}
      />
      <Stack.Screen name="CategoryForm" component={CategoryFormScreen} />
      <Stack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          title: 'Cuentas',
        }}
      />
      <Stack.Screen name="AccountForm" component={AccountFormScreen} />
      <Stack.Screen
        name="TransferForm"
        component={TransferFormScreen}
        options={{
          title: 'Nueva Transferencia',
        }}
      />
    </Stack.Navigator>
  );
}
