# demo-wallet

A small, self-contained crypto-wallet demo built with **React Native + Expo** and
**TypeScript**. It showcases a clean **Feature-Sliced Design** architecture with
**TanStack Query** for server state on top of a fully local mock backend — no accounts,
no network, no real assets, no keys.

> This is a portfolio/demonstration app. Everything (balances, assets, transactions) is
> generated in-memory so the project runs entirely offline.

## Features

- **Home** — total balance, asset breakdown and recent activity, with loading skeletons
  and pull-to-refresh.
- **Send** — a validated transfer form (asset picker, recipient, amount) that runs a
  mock transaction and refreshes the affected queries.
- **Settings** — light/dark theme toggle (persisted) and display-currency selection.

## Stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Runtime        | React Native `0.86` · Expo SDK `57`                |
| Server state   | TanStack Query                                     |
| UI state       | MobX (theme + display currency)                    |
| Navigation     | React Navigation (bottom tabs)                     |
| Forms          | React Hook Form                                    |
| Styling        | styled-components (typed theme, light/dark)        |
| Persistence    | AsyncStorage (UI preferences only)                 |
| Vector / logo  | react-native-svg (inline, no raster brand assets)  |

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

`src/*` is aliased to `src/` (via `babel-plugin-module-resolver` + `tsconfig` paths).

The mock backend lives in [`src/shared/api/mockClient.ts`](src/shared/api/mockClient.ts):
it stores state in memory and resolves each call after a short delay to exercise real
loading states. Entities wrap it in typed query/mutation hooks.

## Run

```bash
npm install
npm start        # then open in Expo Go, or press i / a
```

## Scripts

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run format      # prettier --write
```
