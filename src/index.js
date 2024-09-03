import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./Context/AppContext";
import { UserProvider } from "./Context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContextProvider } from "./Context/DataContext";

const Index = () => {
  return (
    <UserProvider>
      <DataContextProvider>
        <AppProvider>
          <App />
          <ToastContainer />
        </AppProvider>
      </DataContextProvider>
    </UserProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Index />);
