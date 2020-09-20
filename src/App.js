import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = {};

const App = () => {
  return <ThemeProvider theme={theme}>"App"</ThemeProvider>;
};

export default App;
