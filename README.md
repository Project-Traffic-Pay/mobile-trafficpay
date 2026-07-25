# TrafficPay Mobile

![TrafficPay Illustration](./assets/illustration.png)

Mobile app for looking up Sri Lanka traffic fines, paying pending fines, and viewing an e-receipt.

This project is built with Expo + React Native and uses a simple backend API for fine lookup and payment processing.

## Features

- Fine lookup by reference number and category code
- Fine detail view with status, offence, driver, and vehicle data
- Payment form for pending fines
- Receipt screen after successful payment
- Cross-platform support: Android, iOS, and Web
- Custom font loading with splash screen handling

## Tech Stack

- Expo SDK 51
- React Native 0.74
- React 18
- React Navigation (native stack)
- Expo Google Fonts (DM Sans)

## Project Structure

```text
mobile-trafficpay/
  App.js
  app.json
  package.json
  assets/
  src/
    api.js
    screens/
      HomeScreen.js
      FineDetailScreen.js
      PaymentScreen.js
      ReceiptScreen.js
```

## Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI (optional, npx is enough)
- For Android emulator testing: Android Studio + emulator
- For iOS testing: macOS + Xcode

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the Expo development server:

```bash
npm run start
```

3. Run on a target platform:

```bash
npm run android
npm run ios
npm run web
```

## Environment Configuration

The app reads backend URL from `EXPO_PUBLIC_API_URL`.

- If set, this value is used.
- If not set, defaults are:
  - Android emulator: `http://10.0.2.2:5000/api`
  - iOS/Web: `http://localhost:5000/api`

### PowerShell example

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.1.20:5000/api"
npm run start
```

### CMD example

```cmd
set EXPO_PUBLIC_API_URL=http://192.168.1.20:5000/api
npm run start
```

## API Endpoints Expected

The mobile app expects these backend endpoints:

- `GET /fines/lookup?ref=<reference>&category=<categoryCode>`
- `POST /payments/pay`
- `GET /fines/categories`

All endpoints are prefixed by the configured API base URL.

## Request/Response Notes

- `lookupFine` expects a JSON response with:
  - `success: boolean`
  - `fine` object when successful
  - `message` when unsuccessful
- `processPayment` expects:
  - `success: boolean`
  - `receipt` object when successful
  - `message` when unsuccessful

## Test Payment Behavior

The payment screen includes a mock testing hint:

- Type `FAIL` in the card number to simulate payment failure (behavior depends on backend implementation).

## Available Scripts

- `npm run start` - Start Expo dev server
- `npm run android` - Open Android target
- `npm run ios` - Open iOS target
- `npm run web` - Open web build on port 8082

## Troubleshooting

- App cannot reach API on Android emulator:
  - Use `10.0.2.2` instead of `localhost`.
- Physical device cannot reach local backend:
  - Set `EXPO_PUBLIC_API_URL` to your machine LAN IP.
- Font or splash issues:
  - Clear Metro cache: `npx expo start -c`

## Notes

- App display name and package are configured in `app.json`.
- Current Android package: `lk.police.trafficpay`.

## License

This project is currently unlicensed. Add a `LICENSE` file if you want to define usage terms.