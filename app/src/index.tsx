import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from '@material-ui/core/colors/blueGrey';

import "./index.css";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00af91",
    },
    contrastThreshold: 2,
    tonalOffset: 0.2,
    text: {
      primary: blueGrey[800],
      secondary: blueGrey[700],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
