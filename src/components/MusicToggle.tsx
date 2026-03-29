import { useState, useRef } from "react";
import { motion } from "framer-motion";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      // Use a free royalty-free music URL or empty for now
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      // Note: Add actual audio URL here
    }

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-rose"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      title={playing ? "Pause music" : "Play music"}
    >
      <span className="text-2xl">{playing ? "🔊" : "🔇"}</span>
    </motion.button>
  );
};

export default MusicToggle;
