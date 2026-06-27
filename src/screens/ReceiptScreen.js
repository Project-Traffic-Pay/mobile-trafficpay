import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, ScrollView } from 'react-native';

export default function ReceiptScreen({ route, navigation }) {
  const { receipt } = route.params;

  const handleDone = () => {
    // Navigate back to top of stack
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.successIconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.title}>Payment confirmed</Text>
        <Text style={styles.subtitle}>E-Receipt · Sri Lanka Police Traffic Division</Text>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={[styles.detailValue, styles.mono]}>{receipt.transactionId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reference</Text>
            <Text style={[styles.detailValue, styles.mono]}>{receipt.referenceNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>LKR {receipt.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{new Date(receipt.date).toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Driver</Text>
            <Text style={styles.detailValue}>{receipt.driverName}</Text>
          </View>
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Vehicle</Text>
            <Text style={[styles.detailValue, styles.mono]}>{receipt.vehicleNumber}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            SMS notification sent to the issuing officer. You may collect your driving licence.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
          <Text style={styles.primaryButtonText}>Done</Text>
        </TouchableOpacity>

      </ScrollView>
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
    alignItems: 'center',
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ECFDF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  successIcon: {
    fontSize: 32,
    color: '#0D7C3D',
    fontFamily: 'DMSans_700Bold',
  },
  title: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'DMSans_400Regular',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  detailLabel: {
    color: '#999999',
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  detailValue: {
    color: '#111111',
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
  },
  mono: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  infoBox: {
    backgroundColor: '#EFF4FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
    width: '100%',
  },
  infoBoxText: {
    color: '#1A56DB',
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
  }
});
