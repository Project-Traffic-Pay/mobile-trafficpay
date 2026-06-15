import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Platform, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { getCategories } from '../api';

export default function HomeScreen({ navigation }) {
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = () => {
    if (!reference.trim() || !category.trim()) {
      setError('Please enter both reference number and category code.');
      return;
    }
    setError('');
    navigation.navigate('FineDetail', {
      referenceNumber: reference.trim().toUpperCase(),
      categoryCode: category.trim().toUpperCase()
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: Platform.OS === 'web' ? 24 : 12 }}>
            <Image source={require('../../assets/logo.png')} style={{ width: 40, height: 40, marginRight: 12, resizeMode: 'contain' }} />
            <View>
              <Text style={styles.title}>TrafficPay</Text>
              <Text style={styles.subtitle}>Sri Lanka Police</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Reference Number</Text>
            <TextInput
              style={styles.input}
              placeholder="SLP-2026-XXXXX"
              value={reference}
              onChangeText={(text) => setReference(text.toUpperCase())}
              autoCapitalize="characters"
            />

            <Text style={styles.label}>Category Code</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. SPD"
              value={category}
              onChangeText={(text) => setCategory(text.toUpperCase())}
              autoCapitalize="characters"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.primaryButton} onPress={handleLookup} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Look up fine</Text>
              )}
            </TouchableOpacity>
          </View>
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
    fontSize: 28,
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    color: '#555555',
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
    fontFamily: 'DMSans_500Medium',
    color: '#999999',
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
  primaryButton: {
    backgroundColor: '#111111',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
  },
  error: {
    color: 'red',
    fontFamily: 'DMSans_400Regular',
    marginBottom: 16,
  }
});
