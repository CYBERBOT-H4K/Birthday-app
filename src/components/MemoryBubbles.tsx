import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Memory {
  id: number;
  emoji: string;
  title: string;
  message: string;
  date: string;
  color: string;
}

const memories: Memory[] = [
  { id: 1, emoji: "🎭", title: "First Meet", message: "The day our friendship story began. Who knew a simple hello would lead to this?", date: "Day One", color: "bg-rose-light" },
  { id: 2, emoji: "😂", title: "Laugh Attack", message: "Remember when we couldn't stop laughing and everyone stared at us?", date: "The Best Day", color: "bg-lavender-light" },
  { id: 3, emoji: "🌙", title: "Late Night Talks", message: "3 AM conversations that healed our souls. You always listen.", date: "Every Night", color: "bg-peach-light" },
  { id: 4, emoji: "🍕", title: "Food Adventures", message: "Our food adventures are legendary. Partners in crime (and calories)!", date: "Always", color: "bg-mint-light" },
  { id: 5, emoji: "💪", title: "Through Thick & Thin", message: "You held my hand through the darkest days. That means everything.", date: "Forever", color: "bg-rose-light" },
  { id: 6, emoji: "🎵", title: "Our Song", message: "Every time it plays, I think of you and smile like an idiot.", date: "On Repeat", color: "bg-lavender-light" },
];

const MemoryBubbles = () => {
  const [selected, setSelected] = useState<Memory | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Memory Bubbles 🫧
      </motion.h2>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
        {memories.map((memory, i) => (
          <motion.button
            key={memory.id}
            onClick={() => setSelected(memory)}
            className={`${memory.color} w-28 h-28 md:w-36 md:h-36 rounded-full flex flex-col items-center justify-center gap-1 border border-border/50 hover:shadow-lg transition-shadow cursor-pointer`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s` }}
          >
            <span className="text-3xl md:text-4xl">{memory.emoji}</span>
            <span className="text-xs font-body font-semibold text-foreground/70">{memory.title}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
            <motion.div
              className="glass-card p-8 max-w-sm w-full relative z-10 text-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-6xl mb-4 block">{selected.emoji}</span>
              <h3 className="text-2xl font-display text-gradient mb-2">{selected.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-3">{selected.date}</p>
              <p className="font-body text-foreground/80">{selected.message}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground font-body text-sm"
              >
                Close 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryBubbles;
