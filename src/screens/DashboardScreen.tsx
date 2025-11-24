import React, {useMemo} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { PieChart } from 'react-native-svg-charts';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const transactions = useAppSelector((state: any) => state.transactions.items);
  console.log('Transactions from store:', transactions);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = transactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

  const lastFive = transactions.slice(0, 5);

  const categoryMap: Record<string, number> = {};
  transactions.forEach(t => {
    if (t.type === 'debit') {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });


    const pieData = useMemo(() => {
        const categoryMap: Record<string, number> = {};

        transactions.forEach(t => {
        if (t.type === 'debit') {
            const key = t.category || 'Others';
            categoryMap[key] = (categoryMap[key] || 0) + t.amount;
        }
        });

        const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#1A535C', '#FF9F1C', '#9B5DE5'];

        return Object.entries(categoryMap).map(([category, amount], index) => ({
            key: category,
            value: amount,
            svg: {
                fill: colors[index % colors.length],
            },
            arc: {
                outerRadius: '100%',
                innerRadius: '60%',
            },
            category,
        }));
    }, [transactions]);

  return (
    <SafeAreaView style={styles.safeView}>

        <View style={styles.container}>
        <Text variant="headlineMedium">Dashboard</Text>

        <View style={styles.summarySection}>
            <Text style={styles.label}>Monthly Expenses: ₹{monthlyExpenses}</Text>
            <Text style={styles.label}>Bank Balance: ₹{totalBalance}</Text>
        </View>
        {pieData.length > 0 ? (
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Category-wise Spending</Text>

          <View style={styles.chartRow}>
            <PieChart
              style={styles.chart}
              data={pieData}
              valueAccessor={({ item }) => item.value}
            />

            {/* Legend */}
            <View style={styles.legendContainer}>
              {pieData.map(item => (
                <View key={item.key} style={styles.legendRow}>
                  <View
                    style={[styles.legendColorDot, { backgroundColor: item.svg.fill }]}
                  />
                  <Text style={styles.legendText}>
                    {item.category} - ₹{item.value.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <Text style={{ marginTop: 16 }}>No expense data yet.</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeView: { flex: 1 },
    container: { flex: 1, padding: 16 },
    label: { fontWeight: 'bold' },
    card: { marginTop: 8 },
     chartSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart: {
    height: 180,
    width: 180,
  },
  legendContainer: {
    marginLeft: 16,
    flex: 1,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
  },
    summarySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
    },
});
