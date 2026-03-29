import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop } from "@/lib/sounds";

const surprises = [
  { emoji: "🎁", label: "Gift Box", content: "You deserve all the happiness in the world! 🌍" },
  { emoji: "🔮", label: "Crystal Ball", content: "I predict... we'll be old ladies still laughing together! 👵👵" },
  { emoji: "🎪", label: "Magic Hat", content: "Fun fact: You're 100% irreplaceable. That's science. 🔬" },
  { emoji: "🌈", label: "Rainbow", content: "After every storm, you've been my rainbow. Thank you. 🙏" },
];

const SurpriseReveal = () => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const reveal = (index: number) => {
    playPop();
    setRevealed((prev) => new Set(prev).add(index));
  };

  return (
    <section className="py-20 px-4">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Surprise Reveals 🎁
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        Tap each one to reveal a surprise!
      </p>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surprises.map((s, i) => (
          <motion.div
            key={i}
            className="glass-card p-6 text-center cursor-pointer min-h-[160px] flex flex-col items-center justify-center"
            onClick={() => reveal(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!revealed.has(i) ? (
                <motion.div
                  key="hidden"
                  className="flex flex-col items-center gap-2"
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <span className="text-5xl animate-bounce-gentle">{s.emoji}</span>
                  <span className="text-sm font-body text-muted-foreground">{s.label}</span>
                  <span className="text-xs text-primary font-body">Tap me!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">✨</span>
                  <p className="font-body text-sm text-foreground/90">{s.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SurpriseReveal;
