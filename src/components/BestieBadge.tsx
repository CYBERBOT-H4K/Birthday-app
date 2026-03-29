import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import badgeImg from "@/assets/bestie-badge.png";
import { playAchievement } from "@/lib/sounds";

const BestieBadge = () => {
  const played = useRef(false);

  return (
    <section className="py-20 px-4 gradient-rose">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        You Earned This! 🏆
      </motion.h2>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
        onAnimationComplete={() => { if (!played.current) { played.current = true; playAchievement(); } }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full glow-gold blur-xl opacity-50" />
          <img
            src={badgeImg}
            alt="Best Friend Badge"
            width={280}
            height={280}
            loading="lazy"
            className="relative z-10 drop-shadow-xl"
          />
        </motion.div>

        <motion.div
          className="glass-card p-8 mt-8 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-3xl font-display text-gradient mb-3">
            World's Best Friend
          </h3>
          <p className="font-body text-foreground/80">
            This official certificate hereby declares that you are, without a doubt,
            the most amazing, caring, hilarious, and irreplaceable best friend
            in the entire universe. 🌌
          </p>
          <div className="mt-4 text-sm text-muted-foreground font-body italic">
            — Signed with love, your bestie 💕
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BestieBadge;
