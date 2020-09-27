import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import Demo from "./components/Demo";

const theme = createMuiTheme({ custom: {} });

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Demo />
    </ThemeProvider>
  );
};

export default App;
