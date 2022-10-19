import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store/store.js";

// TODO configurar theme
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5f27cd",
      main: "#5f27cd",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const { REACT_APP_AUTH_DOMAIN, REACT_APP_AUTH_CLIENT } = process.env;

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={REACT_APP_AUTH_DOMAIN}
    clientId={REACT_APP_AUTH_CLIENT}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
