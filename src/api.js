import { Platform } from 'react-native';

const DEFAULT_API_BASE = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api' 
  : 'http://localhost:5000/api'; // Works for web and iOS

const API_BASE = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_BASE;

export async function lookupFine(referenceNumber, categoryCode) {
  const res = await fetch(`${API_BASE}/fines/lookup?ref=${encodeURIComponent(referenceNumber)}&category=${encodeURIComponent(categoryCode)}`);
  return res.json();
}

export async function processPayment(data) {
  const res = await fetch(`${API_BASE}/payments/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/fines/categories`);
  return res.json();
}
