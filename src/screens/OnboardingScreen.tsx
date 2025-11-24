import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// import { requestSmsPermission } from '../services/smsReader';
// import { parseSmsToTransaction } from '../services/smsParser';

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
//   const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);

    // const granted = await requestSmsPermission();
    const granted = false;

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
        // const txn = parseSmsToTransaction(sms.body, sms.sender);
        if (txn) {
        //   await dispatch(addTransaction(txn));
        }
      }
    }

    await AsyncStorage.setItem('hasOnboarded', 'true');
    navigation.replace('Dashboard');
  };

  return (
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
        onPress={handleGetStarted}
        loading={loading}
        disabled={loading}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
