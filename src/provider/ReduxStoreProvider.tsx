import { createContext, useContext, type ReactNode } from "react";
import type { AppStore } from "../config/create-store";

const ReduxStoreContext = createContext<AppStore>({} as any);

export const ReduxStoreProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: AppStore;
}) => {
  return (
    <ReduxStoreContext.Provider value={store}>
      {children}
    </ReduxStoreContext.Provider>
  );
};

export const useReduxStore = () => {
  const context = useContext(ReduxStoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
