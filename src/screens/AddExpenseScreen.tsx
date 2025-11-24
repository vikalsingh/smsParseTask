import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { addTransaction } from '../store/transactionsSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from '../store/hooks';

const schema = Yup.object().shape({
  amount: Yup.number().required().min(1),
  category: Yup.string().required(),
  notes: Yup.string(),
});

export default function AddExpenseScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <Text variant="headlineMedium">Add Expense</Text>

        <Formik
            initialValues={{
            amount: '',
            category: 'food',
            notes: '',
            }}
            validationSchema={schema}
            onSubmit={async values => {
            await dispatch(
                addTransaction({
                    amount: Number(values.amount),
                    category: values.category,
                    description: values.notes,
                    date: new Date().toISOString(),
                    type: 'debit',
                    bankName: 'Manual',
                    source: 'manual',
                }),
            );
            navigation.goBack();
            }}
        >
            {({ handleChange, handleSubmit, values }) => (
            <>
                <TextInput
                    label="Amount"
                    value={values.amount}
                    onChangeText={handleChange('amount')}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <TextInput
                    label="Category"
                    value={values.category}
                    onChangeText={handleChange('category')}
                    style={styles.input}
                />

                <TextInput
                    label="Notes"
                    value={values.notes}
                    onChangeText={handleChange('notes')}
                    style={styles.input}
                />

                <Button mode="contained" onPress={handleSubmit}>
                    Save
                </Button>
            </>
            )}
        </Formik>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 12 },
});
