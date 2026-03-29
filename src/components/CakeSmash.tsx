import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import cakeImg from "@/assets/cake.png";
import { playWhoosh, playBirthdaySong } from "@/lib/sounds";

const CakeSmash = () => {
  const [candlesBlown, setCandlesBlown] = useState<Set<number>>(new Set());
  const [wishMessage, setWishMessage] = useState(false);
  const totalCandles = 5;

  const blowCandle = (index: number) => {
    const next = new Set(candlesBlown).add(index);
    setCandlesBlown(next);
    playWhoosh();

    // Mini confetti for each candle
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.5 },
      colors: ["#e88ca5", "#c49dd8", "#f0c27a", "#a8d8a8"],
    });

    if (next.size === totalCandles) {
      setTimeout(() => {
        setWishMessage(true);
        playBirthdaySong();
        // Big celebration
        const duration = 3000;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#e88ca5", "#c49dd8", "#f0c27a"],
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#e88ca5", "#c49dd8", "#f0c27a"],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }, 300);
    }
  };

  return (
    <section className="py-20 px-4 gradient-rose">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Make a Wish! 🎂
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        Click each candle to blow it out 🕯️
      </p>

      <div className="flex flex-col items-center">
        {/* Candles */}
        <div className="flex gap-4 mb-2 relative z-10">
          {[...Array(totalCandles)].map((_, i) => (
            <motion.button
              key={i}
              onClick={() => !candlesBlown.has(i) && blowCandle(i)}
              className="flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence>
                {!candlesBlown.has(i) && (
                  <motion.span
                    className="text-2xl"
                    exit={{ opacity: 0, y: -20, scale: 0 }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    🔥
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="text-3xl">{candlesBlown.has(i) ? "💨" : "🕯️"}</span>
            </motion.button>
          ))}
        </div>

        {/* Cake */}
        <motion.img
          src={cakeImg}
          alt="Birthday cake"
          width={300}
          height={300}
          loading="lazy"
          className="drop-shadow-xl"
          whileHover={{ scale: 1.02 }}
        />

        {/* Wish message */}
        <AnimatePresence>
          {wishMessage && (
            <motion.div
              className="glass-card p-8 mt-8 text-center max-w-md"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <span className="text-5xl block mb-4">🌟</span>
              <h3 className="text-2xl font-display text-gradient mb-2">
                Happy Birthday, Lakshmi Priya! 🎉
              </h3>
              <p className="font-body text-foreground/80">
                May all your dreams come true, Lakshmi Priya! You deserve the whole world and more! 💫🎶
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-muted-foreground font-body mt-4">
          {candlesBlown.size}/{totalCandles} candles blown
        </p>
      </div>
    </section>
  );
};

export default CakeSmash;
