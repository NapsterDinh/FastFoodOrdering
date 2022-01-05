import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SocketContext, socket } from "./app/context/socket";
import { translationMessages } from "./i18n";

import App from "./App";
import LanguageProvider from "./LanguageProvider";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={translationMessages} language={"vi"}>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
