import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, ShoppingBag } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { formatINR, useCart, WHATSAPP_NUMBER } from "@/contexts/CartContext";
import { useAddresses } from "@/contexts/AddressContext";
import AddressForm from "@/components/checkout/AddressForm";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { addresses, defaultAddress } = useAddresses();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [placed, setPlaced] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    const f = new FormData(e.currentTarget);
    const orderLines = items.map((i) => {
      const codeText = i.code?.trim() ? ` (${i.code.trim()})` : "";
      return `• ${i.name}${codeText} — Qty ${i.quantity} × ${formatINR(i.price)} = ${formatINR(i.price * i.quantity)}`;
    });
    const text = [
      "🛒 *New Order — SatvAikya*",
      "",
      "*Customer*",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Email: ${f.get("email")}`,
      `Address: ${f.get("address")}, ${f.get("city")}, ${f.get("state")} - ${f.get("pincode")}`,
      "",
      "*Items*",
      ...orderLines,
      "",
      `*Total: ${formatINR(subtotal)}*`,
      "",
      "*Order Notes*",
      `${f.get("notes") || "—"}`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setPlaced(true);
    clear();
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <PageTransition>
      <SEO
        title="Checkout | SatvAikya"
        description="Complete your order via WhatsApp — quick, personal and secure."
        path="/checkout"
      />
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-5xl text-center">Checkout</h1>
          <p className="mt-3 text-center text-muted-foreground max-w-lg mx-auto">
            Fill in your details — we'll send your order to WhatsApp for the fastest, most personal confirmation.
          </p>

          {items.length === 0 && !placed ? (
            <div className="mt-16 max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-8">
              <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground" />
              <h2 className="mt-4 font-display text-xl">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground text-sm">Add a piece from our collections to continue.</p>
              <Link to="/collections" className="mt-6 inline-block btn-luxury px-6 py-3 rounded-full font-medium">
                Browse Collections
              </Link>
            </div>
          ) : placed ? (
            <div className="mt-16 max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-8">
              <div className="mx-auto h-12 w-12 rounded-full bg-brand/10 text-brand inline-flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-2xl">Order sent!</h2>
              <p className="mt-2 text-muted-foreground text-sm">Your order details opened in WhatsApp. We'll confirm shortly.</p>
            </div>
          ) : (
            <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8">
              <form onSubmit={submit} className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-4">
                <h2 className="font-display text-xl">Shipping details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Full name", type: "text" },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "pincode", label: "Pincode", type: "text" },
                  ].map((f) => (
                    <label key={f.name} className="block">
                      <span className="text-sm font-medium">{f.label}</span>
                      <input required name={f.name} type={f.type} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                    </label>
                  ))}
                </div>
                <label className="block">
                  <span className="text-sm font-medium">Address</span>
                  <input required name="address" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium">City</span>
                    <input required name="city" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">State</span>
                    <input required name="state" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium">Order notes (optional)</span>
                  <textarea name="notes" rows={3} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand resize-none" />
                </label>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90 transition">
                  <MessageCircle className="h-4 w-4" /> Place Order via WhatsApp
                </button>
                <p className="text-xs text-muted-foreground text-center">Payment is coordinated directly with our team over WhatsApp.</p>
              </form>

              <aside className="bg-card rounded-2xl border border-border p-6 h-fit lg:sticky lg:top-24">
                <h2 className="font-display text-xl">Order summary</h2>
                <ul className="mt-4 space-y-3">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-3">
                      <img src={i.image} alt={i.name} width={56} height={56} className="h-14 w-14 rounded-lg object-cover shrink-0" loading="lazy" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{i.name}</div>
                        <div className="text-xs text-muted-foreground">{i.code} · Qty {i.quantity}</div>
                      </div>
                      <div className="text-sm font-medium whitespace-nowrap">{formatINR(i.price * i.quantity)}</div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-2xl">{formatINR(subtotal)}</span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}