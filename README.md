# demo-wallet

A small, self-contained crypto-wallet demo built with **React Native + Expo** and
**TypeScript**. It showcases a clean **Feature-Sliced Design** architecture with
**TanStack Query** for server state on top of a fully local mock backend — no accounts,
no network, no real assets, no keys.

> Portfolio/demonstration app. Everything (balances, assets, transactions) is generated
> in-memory, so the project runs entirely offline.

## Features

- **Home** — total balance, asset breakdown and recent activity, with loading skeletons
  and pull-to-refresh.
- **Send** — a validated transfer form (asset picker, recipient, amount) that runs a
  mock transaction and refreshes the affected queries.
- **Settings** — light/dark theme toggle (persisted) and display-currency selection.

## Stack

| Concern       | Choice                                            |
| ------------- | ------------------------------------------------- |
| Runtime       | React Native `0.86` · Expo SDK `57` · React `19`  |
| Language      | TypeScript                                        |
| Server state  | TanStack Query                                    |
| UI state      | MobX (theme + display currency)                   |
| Navigation    | React Navigation (native stack + bottom tabs)     |
| Forms         | React Hook Form                                   |
| Styling       | styled-components (typed theme, light/dark)       |
| Animation     | Reanimated · Skia (WarpBackground shader)         |
| Persistence   | AsyncStorage · SecureStore                        |
| Vector / logo | react-native-svg (inline, no raster brand assets) |

## Prerequisites

- **Node.js** 20+ and npm
- **Watchman** (macOS, recommended)
- For native dev builds: **Xcode** (iOS) and/or **Android Studio** (Android)

## Getting started

```bash
npm install
npm start          # Metro bundler — press i / a / w, or scan the QR in Expo Go
```

This app uses native modules (Skia, Reanimated, SecureStore) and ships `ios/` and
`android/` folders, so run a **development build** rather than Expo Go:

```bash
npm run ios        # build + run on iOS simulator / device
npm run android    # build + run on Android emulator / device
npm run web        # run in the browser
```

## Scripts

```bash
npm start           # expo start
npm run ios         # expo run:ios
npm run android     # expo run:android
npm run web         # expo start --web
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run format      # prettier --write "src/**/*.{ts,tsx}"
npm test            # jest (jest-expo)
```

## Architecture

Feature-Sliced Design. Imports flow **downward only**:

```
app → screens → widgets → features → entities → shared
```

```
src/
  app/        providers (QueryClient, ThemeProvider) + navigation
  screens/    home · send · settings
  widgets/    home (BalanceCard, AssetList, TransactionList)
  features/   send-form · theme-toggle
  entities/   wallet · transaction · ui-settings
  shared/     api (mock client) · ui (primitives) · theme · lib
```

`@app`, `@shared`, … aliases map to `src/*` (via `babel-plugin-module-resolver` +
`tsconfig` paths).

The mock backend lives in [`src/shared/api/mockClient.ts`](src/shared/api/mockClient.ts):
it stores state in memory and resolves each call after a short delay to exercise real
loading states. Entities wrap it in typed query/mutation hooks.
