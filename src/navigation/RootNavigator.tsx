import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from "./../screens/SplashScreen";
import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
  AddExpense: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{
          title: 'Add Expense',
          headerShown: true,
          headerBackTitle: 'Back',
        }} />
      <Stack.Screen name="History" component={TransactionHistoryScreen} options={{
          title: 'Transaction History',
          headerShown: true,
          headerBackTitle: 'Back',
        }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
