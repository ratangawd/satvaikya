import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { WHATSAPP_NUMBER } from "@/contexts/CartContext";

// 
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // const submit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const f = new FormData(e.currentTarget);
  //   const text = `New enquiry from SatvAikya website%0A%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AEmail: ${f.get("email")}%0AMessage: ${f.get("message")}`;
  //   window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  //   setSent(true);
  //   (e.currentTarget as HTMLFormElement).reset();
  // };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSent(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await emailjs.send(
        "service_ezl103e",
        "template_ps5ii7a",
        {
          from_name: data.get("name"),
          from_email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          time: new Date().toLocaleString("en-IN"),
        },
        "UAGkPDFZl-fd87LIx"
      );

      setSent(true);
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Contact SatvAikya"
        description="Get in touch with SatvAikya for custom wooden decor, bulk gifting enquiries, or wholesale collaborations."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "SatvAikya Innovations",
          email: "satvaikya@gmail.com",
          telephone: "+91-98664-10523",
          address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
        }}
      />
      <section className="pt-32 pb-10 md:pt-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Contact</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Let's get closer</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            For custom orders, bulk gifting, or a note about anything on your mind — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Call us", value: "+91 98664 10523  +91 70328 71423" },
              { icon: Mail, label: "Email", value: "satvaikya@gmail.com" },
              { icon: MapPin, label: "Studio", value: "Hyderabad, Telangana, India" },
              { icon: Clock, label: "Working hours", value: "Mon–Sat · 10:00 AM – 7:00 PM IST" },
            ].map((b) => (
              <div key={b.label} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{b.label}</div>
                  <div className="mt-1 font-medium">{b.value}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90 transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href="tel:+919866410523" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full btn-luxury font-medium">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <a href="https://instagram.com" aria-label="Instagram" className="h-10 w-10 rounded-full bg-card border border-border inline-flex items-center justify-center hover:bg-brand hover:text-white transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="h-10 w-10 rounded-full bg-card border border-border inline-flex items-center justify-center hover:bg-brand hover:text-white transition">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={submit} className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-4">
              {sent && (
                <div className="rounded-lg bg-brand/10 text-brand p-3 text-sm">Thank you! Your enquiry has been sent successfully.</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium">Full name</span>
                  <input required name="name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Phone</span>
                  <input required name="phone" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input required type="email" name="email" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Message</span>
                <textarea required name="message" rows={5} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand resize-none" />
              </label>
              {/* <button type="submit" className="w-full btn-luxury px-6 py-3.5 rounded-full font-medium">Send Message</button> */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-luxury px-6 py-3.5 rounded-full font-medium disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.518776879215!2d78.43564527493821!3d17.53047058338125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f8f3f89dbe9%3A0x3ed3fa5af2baf02!2sSatvaikya%20Innovations!5e0!3m2!1sen!2sin!4v1785910155373!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Satvaikya Innovations Location"
            className="w-full"
          />
        </div>
      </section>
    </PageTransition>
  );
}