import { motion } from "framer-motion";

interface CareMeterProps {
  interactions: number;
  maxInteractions: number;
}

const CareMeter = ({ interactions, maxInteractions }: CareMeterProps) => {
  const percentage = Math.min((interactions / maxInteractions) * 100, 100);

  const getLabel = () => {
    if (percentage < 25) return "Getting Started 🌱";
    if (percentage < 50) return "Good Friends 🤝";
    if (percentage < 75) return "Close Besties 💖";
    if (percentage < 100) return "Almost There! 🔥";
    return "Bestie Level: 100% 💯";
  };

  return (
    <section className="py-20 px-4">
      <motion.h2
        className="text-5xl md:text-6xl font-display text-gradient text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Friendship Meter 💖
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12">
        Interact with the page to fill the meter!
      </p>

      <div className="max-w-md mx-auto">
        {/* Heart container */}
        <div className="relative flex justify-center mb-6">
          <motion.div
            className="text-9xl relative"
            animate={percentage >= 100 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: percentage >= 100 ? Infinity : 0 }}
          >
            ❤️
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontSize: "1.5rem" }}
            >
              <span className="font-body font-bold text-primary-foreground drop-shadow-md">
                {Math.round(percentage)}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="h-4 rounded-full bg-muted overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-lavender"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <p className="text-center font-body font-semibold text-foreground/80 text-lg">
          {getLabel()}
        </p>
        <p className="text-center font-body text-sm text-muted-foreground mt-1">
          {interactions} interactions
        </p>
      </div>
    </section>
  );
};

export default CareMeter;
