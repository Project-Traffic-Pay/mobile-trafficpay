import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Platform, ScrollView } from 'react-native';
import { lookupFine } from '../api';

export default function FineDetailScreen({ route, navigation }) {
  const { referenceNumber, categoryCode } = route.params;
  const [fine, setFine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFine();
  }, []);

  const fetchFine = async () => {
    try {
      const data = await lookupFine(referenceNumber, categoryCode);
      if (data.success) {
        setFine(data.fine);
      } else {
        setError(data.message || 'Fine not found');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1A56DB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!fine) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.reference}>{fine.referenceNumber}</Text>
          
          <View style={[styles.statusTag, fine.status === 'paid' ? styles.statusPaid : styles.statusPending]}>
            <Text style={[styles.statusText, fine.status === 'paid' ? styles.statusTextPaid : styles.statusTextPending]}>
              {fine.status.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.amount}>LKR {fine.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Offence</Text>
            <Text style={styles.detailValue}>{fine.categoryCode} — {fine.categoryName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Driver</Text>
            <Text style={styles.detailValue}>{fine.driverName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>NIC</Text>
            <Text style={[styles.detailValue, styles.mono]}>{fine.driverNic}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle</Text>
            <Text style={[styles.detailValue, styles.mono]}>{fine.vehicleNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>District</Text>
            <Text style={styles.detailValue}>{fine.districtName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Issued</Text>
            <Text style={styles.detailValue}>{new Date(fine.issuedAt).toLocaleDateString()}</Text>
          </View>
        </View>

        {fine.status === 'pending' ? (
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => navigation.navigate('Payment', { fine })}
          >
            <Text style={styles.primaryButtonText}>Pay LKR {fine.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>Already paid</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  reference: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#111111',
    marginBottom: 12,
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusPending: {
    backgroundColor: '#FFF7ED',
  },
  statusPaid: {
    backgroundColor: '#ECFDF3',
  },
  statusText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  statusTextPending: {
    color: '#B25000',
  },
  statusTextPaid: {
    color: '#0D7C3D',
  },
  amount: {
    fontSize: 28,
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  detailLabel: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  detailValue: {
    color: '#111111',
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  mono: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
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
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 120,
  },
  secondaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
  },
  infoBox: {
    backgroundColor: '#ECFDF3',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  infoBoxText: {
    color: '#0D7C3D',
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 16,
  }
});
