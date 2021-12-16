import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";

ReactDOM.render(
  <GlobalProvider>
    <Router>
      <App />
    </Router>
  </GlobalProvider>,
  document.getElementById("root"),
);
