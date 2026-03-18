import { rootReducer } from "../reducers/reducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import localforage from "localforage";
import type { Dependencies } from "./dependencies";
import {
  configureStore,
  type Action,
  type ThunkDispatch,
} from "@reduxjs/toolkit";
import { isDevMode } from "./env";
import { createAppListenerMiddleware } from "./create-app-listener-middleware";
import type { PersistPartial } from "redux-persist/es/persistReducer";

const CURRENT_STORE_VERSION = 1;

const persistConfig = {
  key: "root",
  storage: localforage,
  version: CURRENT_STORE_VERSION,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (
  extraArgument: Dependencies,
  preloadedState?: Partial<RootState>
) =>
  configureStore({
    reducer: persistedReducer,
    devTools: isDevMode,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).prepend(createAppListenerMiddleware.middleware),
    preloadedState: preloadedState as any,
  });

export const createTestStore = (
  dependencies: Partial<Dependencies> = {},
  preloadedState?: Partial<RootState>
) => configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: dependencies as Dependencies,
      },
    }),
  preloadedState: preloadedState as any,
}) as AppStore;

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>;
