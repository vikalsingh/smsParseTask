import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const init = async () => {
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
