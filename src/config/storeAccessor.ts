import type { AppStore } from "./create-store";

let appStore: AppStore | null = null;

export const setAppStore = (store: AppStore) => {
  appStore = store;
};

export const getAppStoreState = () => {
  return appStore?.getState();
};

