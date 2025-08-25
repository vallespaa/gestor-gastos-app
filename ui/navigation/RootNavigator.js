import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import AddExpenseScreen from '../features/add/AddExpenseScreen';
import CategoriesScreen from '../features/categories/CategoriesScreen';
import NewCategoryScreen from '../features/categories/components/NewCategoryScreen';
import CategoryFormScreen from '../features/categories/CategoryFormScreen';
import AccountsScreen from '../features/accounts/AccountsScreen';
import AccountFormScreen from '../features/accounts/AccountFormScreen.js';
import { COLORS } from '../../shared/styles/global.js';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.black,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerShadowVisible: false
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
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Categorías',
        }}
      />
      <Stack.Screen
        name="CategoryForm"
        component={CategoryFormScreen}
      />
      <Stack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          title: 'Cuentas',
        }}
      />
      <Stack.Screen
        name="AccountForm"
        component={AccountFormScreen}
      />
    </Stack.Navigator>
  );
}
