import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContexts";
import { CustomerAuthProvider } from "./contexts/CustomerAuthContext";
import { AddressProvider } from "./contexts/AddressContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
      <CustomerAuthProvider>
        <AuthProvider>
          <CartProvider>
            <AddressProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </AddressProvider>
          </CartProvider>
        </AuthProvider>
      </CustomerAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);