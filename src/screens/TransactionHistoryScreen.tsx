import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeTransaction } from '../store/transactionsSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionHistoryScreen() {
  const transactions = useAppSelector(state => state.transactions.items);
  const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
        <Text variant="headlineMedium">Transaction History</Text>

        <FlatList
            data={transactions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
            <Card style={styles.card}>
                <Card.Content>
                <Text>{item.description}</Text>
                <Text>₹{item.amount}</Text>
                <Text>{item.date.split('T')[0]}</Text>

                <Button
                    onPress={() => dispatch(removeTransaction(item.id!))}
                    textColor="red"
                >
                    Delete
                </Button>
                </Card.Content>
            </Card>
            )}
        />
        </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: { marginTop: 8 },
});
