import React from "react";
import { Button } from "@material-ui/core";

// redux store
import store from "./store";
import { Provider } from "react-redux";

// styles
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "styles/theme";

// routes
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "views/Routes";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
