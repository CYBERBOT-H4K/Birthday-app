import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatarImg from "@/assets/bestie-avatar.png";

const messages = [
  "You're my favorite human! 💖",
  "Thanks for being YOU! 🌟",
  "BFFs forever and ever! 🤝",
  "You make life magical ✨",
  "I'm so lucky to have you! 🍀",
  "No one gets me like you do 💕",
  "You're literally the best! 🏆",
];

const BestieAvatar = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 flex flex-col items-center">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Your Bestie Says... 💬
      </motion.h2>

      <div className="relative">
        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            className="glass-card px-6 py-3 mb-4 text-center max-w-xs mx-auto"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-body font-semibold text-foreground/90">{messages[msgIndex]}</p>
          </motion.div>
        </AnimatePresence>

        {/* Avatar */}
        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={avatarImg}
            alt="Bestie avatar"
            width={250}
            height={250}
            loading="lazy"
            className="mx-auto drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BestieAvatar;
