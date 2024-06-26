import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
