import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OverviewScreen from '../features/overview/OverviewScreen';
import AddExpenseScreen from '../features/add/AddExpenseScreen';
import TransactionsScreen from '../features/transactions/TransactionsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Overview" component={OverviewScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tab.Screen name="Add" component={AddExpenseScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="add" size={24} color={color} /> }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} /> }} />
    </Tab.Navigator>
  );
}
