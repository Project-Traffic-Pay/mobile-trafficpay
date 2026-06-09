import React, { useCallback } from 'react';
import { Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  DMSans_400Regular, 
  DMSans_500Medium, 
  DMSans_600SemiBold, 
  DMSans_700Bold 
} from '@expo-google-fonts/dm-sans';

import HomeScreen from './src/screens/HomeScreen';
import FineDetailScreen from './src/screens/FineDetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Set global default font for Text and TextInput
  const oldTextRender = Text.render;
  if(Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.style = { fontFamily: 'DMSans_400Regular', color: '#111111' };
  
  if(TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.style = { fontFamily: 'DMSans_400Regular', color: '#111111' };

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerShadowVisible: false,
          headerTintColor: '#111111',
          headerTitleStyle: { fontFamily: 'DMSans_600SemiBold', fontSize: 17 },
          contentStyle: { backgroundColor: '#FAFAFA' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FineDetail" component={FineDetailScreen} options={{ title: 'Fine Details' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: 'Receipt', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
