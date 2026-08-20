import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import FloatingWhatsApp from "./FloatingWhatsapp";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-[104px]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  );
}