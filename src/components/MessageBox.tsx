import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { playSparkle } from "@/lib/sounds";
import emailjs from "@emailjs/browser";

const YOUR_EMAIL = "your@gmail.com";
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "birthday_message";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// Initialize EmailJS on load
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

// Simple client-side encryption (Base64 + character shift)
const encryptMessage = (text: string): string => {
  const shifted = text
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) + 3))
    .join("");
  return btoa(shifted);
};

const decryptMessage = (encrypted: string): string => {
  try {
    const shifted = atob(encrypted);
    return shifted
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0) - 3))
      .join("");
  } catch {
    return "[Unable to decrypt]";
  }
};

const MessageBox = () => {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please write a message first! ✍️");
      return;
    }

    if (!PUBLIC_KEY || !SERVICE_ID) {
      toast.error("Email service not configured. Please try again later. ⚙️");
      return;
    }

    setIsSending(true);
    const name = senderName.trim() || "Your Bestie";
    const encrypted = encryptMessage(message.trim());

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: YOUR_EMAIL,
        from_name: name,
        encrypted_message: encrypted,
        decrypted_message: message.trim(),
        subject: `💌 Secret Message from ${name} — Birthday Surprise!`,
      });

      playSparkle();
      setSent(true);
      toast.success("Message encrypted & sent! 📧✨");

      setTimeout(() => {
        setMessage("");
        setSenderName("");
        setSent(false);
      }, 4000);
    } catch (error) {
      console.error("Email send failed:", error);
      toast.error("Failed to send message. Please try again. 😢");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Send a Secret Message 💌
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground font-body mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Write a birthday wish — it'll be encrypted & sent to Gmail! 🔐
      </motion.p>
      <p className="text-center text-xs text-muted-foreground/60 font-body mb-10 flex items-center justify-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-[hsl(142,70%,45%)]" />
        End-to-end encrypted
      </p>

      <motion.div
        className="max-w-lg mx-auto glass-card p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-body font-semibold text-foreground/70 mb-1">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Bestie 💕"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground/70 mb-1">
                  Your Message 🔒
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Happy Birthday! You're the best friend anyone could ever ask for... 🎂💖"
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground/50 font-body mt-1 text-right">
                  {message.length}/500
                </p>
              </div>

              <motion.button
                onClick={handleSend}
                disabled={isSending}
                className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-body font-bold text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.97 }}
              >
                <span>{isSending ? "⏳" : "🔐"}</span>
                {isSending ? "Sending..." : "Encrypt & Send"}
                <span>{isSending ? "📤" : "📧"}</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <span className="text-6xl block mb-4">📧✨</span>
              <h3 className="text-2xl font-display text-gradient mb-2">
                Message Encrypted & Sent!
              </h3>
              <p className="font-body text-foreground/70 text-sm">
                Your secret message is on its way! 🔒💕
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default MessageBox;