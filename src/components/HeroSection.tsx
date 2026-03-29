import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { playSparkle } from "@/lib/sounds";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Cherry blossom landscape"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/80" />

      {/* Floating petals */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: -50,
            rotate: 0,
            opacity: 0.7,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 50 : 1100,
            x: `+=${Math.random() * 200 - 100}`,
            rotate: 360,
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-display text-gradient mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          To My Bestie
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl font-body text-foreground/80 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          A little corner of the internet, just for you 💕
        </motion.p>
        <motion.button
          onClick={() => { playSparkle(); onStart(); }}
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg glow-rose animate-pulse-glow hover:scale-105 transition-transform"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          ✨ Open Your Surprise ✨
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
