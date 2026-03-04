import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import type { AppStore } from '../config/create-store';
import type { Persistor } from 'redux-persist/es/types';
import App from '../App';
import type { AppRouter } from '../routes/Router';


export const Provider = ({store, persistor, router}: {
  store: AppStore,
  persistor: Persistor,
  router: (store: AppStore) => AppRouter
}) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<></>}>
        <App store={store} router={router(store)}/>
      </PersistGate>
    </ReduxProvider>
  );
};
