import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playBloom } from "@/lib/sounds";

const blossoms = [
  { emoji: "🌷", memory: "Our first photo together", detail: "The day we became inseparable! 📸", color: "bg-rose-light" },
  { emoji: "🌻", memory: "That road trip adventure", detail: "Singing at the top of our lungs! 🚗", color: "bg-accent/30" },
  { emoji: "🌺", memory: "Matching outfits day", detail: "Twinning is winning! 👯‍♀️", color: "bg-rose-light" },
  { emoji: "🌼", memory: "Birthday surprise you planned", detail: "I cried happy tears! 🎂", color: "bg-gold-light" },
  { emoji: "🌸", memory: "Dancing in the rain", detail: "Best spontaneous moment ever! 💃", color: "bg-lavender-light" },
  { emoji: "💐", memory: "Supporting each other's dreams", detail: "Forever your biggest cheerleader! 📣", color: "bg-mint-light" },
];

const BlossomMemories = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-rose-light/50 to-lavender-light/30 relative overflow-hidden">
      {/* Floating petals background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          initial={{ x: `${Math.random() * 100}%`, y: -30, opacity: 0.6 }}
          animate={{
            y: "110vh",
            x: `${Math.random() * 100}%`,
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}

      <motion.h2
        className="text-5xl md:text-6xl font-display text-primary text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Memory Garden 🌸
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Tap a flower to watch it bloom with our memories
      </motion.p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {blossoms.map((b, i) => (
          <motion.div
            key={i}
            className={`${b.color} rounded-2xl p-6 text-center cursor-pointer border border-border/50 shadow-sm backdrop-blur-sm`}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 30px -10px hsl(340 65% 65% / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { if (selected !== i) playBloom(); setSelected(selected === i ? null : i); }}
          >
            <motion.span
              className="text-5xl block mb-3"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
              animate={selected === i ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
            >
              {b.emoji}
            </motion.span>
            <p className="font-body text-sm font-semibold text-foreground/80 mb-1">
              {b.memory}
            </p>
            <AnimatePresence>
              {selected === i && (
                <motion.p
                  className="font-body text-xs text-foreground/60 mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {b.detail}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bloom counter */}
      <motion.p
        className="text-center text-muted-foreground font-body text-sm mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {selected !== null ? "🌺 A memory bloomed!" : "✨ Tap a flower to bloom"}
      </motion.p>
    </section>
  );
};

export default BlossomMemories;
