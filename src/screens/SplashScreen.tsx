import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loadTransactions } from '../store/transactionsSlice';
import { useAppDispatch } from '../store/hooks';

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(loadTransactions());
      const onboarded = await AsyncStorage.getItem('hasOnboarded');

      setTimeout(() => {
        if (onboarded === 'true') {
          navigation.replace('Onboarding');
        } else {
          navigation.replace('Onboarding');
        }
      }, 1500);
    };

    init();
  }, []);
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Smart Expense Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
