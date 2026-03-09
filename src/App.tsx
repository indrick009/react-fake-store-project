import React, { useEffect, useState } from "react";
import "./index.css";

import { useSelector } from "react-redux";
import type { AppStore } from "./config/create-store";
import { ReduxStoreProvider } from "./provider/ReduxStoreProvider";
import { RouterProvider } from "react-router-dom";
import { createRouter, type AppRouter } from "./routes/Router";

const App: React.FC<{ store: AppStore; router: AppRouter }> = ({ store }) => {
  const [router, setRouter] = useState<AppRouter | null>(null);
  const isRehydrated = useSelector((state: any) => state._persist?.rehydrated);

  useEffect(() => {
    if (isRehydrated && !router) {
      const r = createRouter({ store });
      setRouter(r);
    }
  }, [isRehydrated]);

  if (!isRehydrated || !router) return <div></div>;

  return (
    <ReduxStoreProvider store={store}>
      <RouterProvider router={router} />
    </ReduxStoreProvider>
  );
};

export default App;