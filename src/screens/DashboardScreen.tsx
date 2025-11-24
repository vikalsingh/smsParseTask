// src/screens/DashboardScreen.tsx

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Victory from 'victory-native';
import { useSelector } from 'react-redux';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const transactions = useSelector((state: any) => state.transactions.items);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastFive = transactions.slice(0, 5);

  const categoryMap: Record<string, number> = {};
  transactions.forEach(t => {
    if (t.type === 'debit') {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map(key => ({
    x: key,
    y: categoryMap[key],
  }));

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Dashboard</Text>

      <Text style={styles.label}>Monthly Expenses: ₹{monthlyExpenses}</Text>

      {pieData.length > 0 && (
        <Victory.VictoryPie data={pieData} colorScale="cool" />
      )}

      <Text style={[styles.label, { marginTop: 10 }]}>Last 5 Transactions</Text>

      <FlatList
        data={lastFive}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item.description}</Text>
              <Text>₹{item.amount}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddExpense')}
        style={{ marginTop: 10 }}
      >
        Add Expense
      </Button>

      <Button
        onPress={() => navigation.navigate('History')}
        style={{ marginTop: 10 }}
      >
        View All Transactions
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginTop: 10, fontWeight: 'bold' },
  card: { marginTop: 8 },
});
