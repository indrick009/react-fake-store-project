import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { createStore } from "./config/create-store";
import { extraArgument } from "./config/extraArgument";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "./provider/Provider";
import { createRouter } from "./routes/Router";
import { setAppStore } from "./config/storeAccessor";

const store = createStore(extraArgument);
setAppStore(store);
setupListeners(store.dispatch);

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider
      store={store}
      persistor={persistor}
      router={(s) => createRouter({ store: s })}
    />
    <ToastContainer style={{ width: "450px" }} />
  </React.StrictMode>,
);
