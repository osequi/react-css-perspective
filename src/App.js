import React from "react";
import { ThemeProvider } from "@material-ui/core";

import Demo from "./components/Demo";

const theme = {};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Demo />
    </ThemeProvider>
  );
};

export default App;
