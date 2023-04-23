import { ShortcutProvider } from "@shopify/react-shortcuts";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routes/AppRoutes";
import store, { persistor } from "./store";
import { NhostClient, NhostProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { onError } from "./utils/onError";
import { errorHandler } from "./utils/errorHandler";

const nhost = new NhostClient({
  subdomain: "local",
  region: "",
  adminSecret: "nhost-admin-secret",
});

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ShortcutProvider>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NhostProvider nhost={nhost}>
              <NhostApolloProvider
                nhost={nhost}
                onError={onError(errorHandler)}
              >
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </NhostApolloProvider>
            </NhostProvider>
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </ShortcutProvider>
  </React.StrictMode>
);
