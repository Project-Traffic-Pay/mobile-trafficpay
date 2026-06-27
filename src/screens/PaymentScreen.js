import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { processPayment } from '../api';

export default function PaymentScreen({ route, navigation }) {
  const { fine } = route.params;
  
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    if (!name || !cardNumber || !expiry || !cvv) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await processPayment({
        referenceNumber: fine.referenceNumber,
        categoryCode: fine.categoryCode,
        cardNumber,
        cardHolderName: name,
        expiryDate: expiry,
        cvv
      });

      if (data.success) {
        navigation.navigate('Receipt', { receipt: data.receipt });
      } else {
        setError(data.message || 'Payment failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Payment</Text>
          
          <View style={styles.summaryBox}>
            <Text style={styles.summaryRef}>{fine.referenceNumber}</Text>
            <Text style={styles.summaryAmount}>LKR {fine.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
          </View>
          
          <Text style={styles.warningNote}>Mock payment. Type FAIL in card number to test failure.</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Name on card</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. JOHN DOE"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Card number</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Expiry</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={setExpiry}
                />
              </View>
              <View style={styles.half}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="123"
                  value={cvv}
                  onChangeText={setCvv}
                  secureTextEntry
                />
              </View>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handlePay} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Pay LKR {fine.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryButton, { marginTop: 12 }]} onPress={() => navigation.goBack()} disabled={loading}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: '#EFF4FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6E4FF',
  },
  summaryRef: {
    fontSize: 14,
    color: '#1A56DB',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  summaryAmount: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
  },
  warningNote: {
    color: '#B25000',
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#999999',
    fontFamily: 'DMSans_500Medium',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    color: '#111111',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  primaryButton: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
  },
  error: {
    color: 'red',
    fontFamily: 'DMSans_400Regular',
    marginTop: 8,
  },
});
