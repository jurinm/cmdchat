import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthStore from "./store/authStore";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthStore>
      <App />
    </AuthStore>
  </React.StrictMode>
);
