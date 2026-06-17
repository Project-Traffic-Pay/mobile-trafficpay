import { Platform } from 'react-native';

const API_BASE = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api' 
  : 'http://localhost:5000/api'; // Works for web and iOS
// For physical device, replace with your local IP: http://192.168.x.x:5000/api

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
