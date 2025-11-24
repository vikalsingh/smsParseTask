import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTransaction } from '../store/transactionsSlice';
import { useAppDispatch } from '../store/hooks';

// import { requestSmsPermission } from '../services/smsReader';
import { parseSmsToTransaction } from '../services/smsParser';

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);

    // const granted = await requestSmsPermission();
    const granted = true;

    if (granted) {
      // TODO: Replace this with actual SMS reading
      const sampleSmsList = [
        {
          sender: 'HDFCBK',
          body: 'INR 3500.00 debited from your A/C on 22 Jan at Amazon.',
        },
        {
          sender: 'AXISBK',
          body: 'Rs 12000 credited to your account as Salary.',
        },
      ];

      for (const sms of sampleSmsList) {
        const txn = parseSmsToTransaction(sms.body, sms.sender);
        console.log('Parsed transaction:', txn);
        if (txn) {

          await dispatch(addTransaction(txn));
        }
      }
    }

    await AsyncStorage.setItem('hasOnboarded', 'true');
    navigation.replace('Dashboard');
  };
  const navigateToDashboard = async () => {
    setLoading(true);
    await AsyncStorage.setItem('hasOnboarded', 'true');
    navigation.replace('Dashboard');
  }

  return (
    <SafeAreaView style={styles.safeView}>
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
        Welcome 👋
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Smart Expense Tracker automatically reads bank SMS and tracks your
        expenses.
      </Text>

      <Button
        mode="contained"
        onPress={navigateToDashboard}
        loading={loading}
        disabled={loading}
      >
        Get Started
      </Button>
      <Button
        mode="contained"
        onPress={handleGetStarted}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 10 }}
      >
        Parse Sample SMS
      </Button>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeView: { flex: 1 },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
