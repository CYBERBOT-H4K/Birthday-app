import { motion } from "framer-motion";
import { toast } from "sonner";

const Footer = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const friendName = "Lakshmi Priya";

  const shareWhatsApp = () => {
    const message = `🎉✨ Hey ${friendName}! ✨🎉\n\n🎂 Happy Birthday, bestie! 🎂\n\nI made something really special just for you 💕\nClick below to see your surprise:\n\n👇👇👇\n${shareUrl}\n\n💖 You mean the world to me!\n🌸 Forever & Always, Your Bestie 🌸`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
    toast.success("Opening WhatsApp... 💬");
  };

  const shareWhatsAppToContact = () => {
    const message = `🎉 Check out this amazing birthday surprise I made for ${friendName}! 💕\n\n🎂 It's full of memories, wishes, and love!\n\n👇 Open it here:\n${shareUrl}\n\n✨ Made with love 💖`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
    toast.success("Share it with anyone! 💬");
  };

  const shareInstagram = () => {
    navigator.clipboard.writeText(
      `🎉 Happy Birthday ${friendName}! 🎂💕\n\nI made this special surprise page for my bestie!\n✨ ${shareUrl}\n\n#HappyBirthday #BestFriend #BestieGoals 💖🌸`
    );
    toast.success("Caption & link copied! Paste it in your Instagram story or DM 📸");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard! 🔗");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${friendName}! 🎂`,
          text: `Check out this birthday surprise I made for ${friendName}! 💕✨`,
          url: shareUrl,
        });
        toast.success("Shared successfully! 🎉");
      } catch {
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  return (
    <footer className="py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-display text-gradient mb-4">
          Share with 💕
        </h2>
        <p className="font-body text-muted-foreground max-w-md mx-auto mb-8">
          Send this surprise to {friendName} or share it with the world! 🌍
        </p>

        <div className="flex flex-col items-center gap-4 mb-8">
          {/* Primary: Send to Lakshmi Priya */}
          <motion.button
            onClick={shareWhatsApp}
            className="px-8 py-4 rounded-full bg-[hsl(142,70%,45%)] text-white font-body font-bold text-base shadow-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">💬</span>
            Send to {friendName} on WhatsApp
          </motion.button>

          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              onClick={shareWhatsAppToContact}
              className="px-6 py-3 rounded-full bg-mint text-foreground font-body font-semibold text-sm shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share via WhatsApp 💬
            </motion.button>
            <motion.button
              onClick={shareInstagram}
              className="px-6 py-3 rounded-full bg-peach text-foreground font-body font-semibold text-sm shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Instagram 📸
            </motion.button>
            <motion.button
              onClick={copyLink}
              className="px-6 py-3 rounded-full bg-lavender-light text-foreground font-body font-semibold text-sm border border-border shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Copy Link 🔗
            </motion.button>
            <motion.button
              onClick={shareNative}
              className="px-6 py-3 rounded-full bg-gold-light text-foreground font-body font-semibold text-sm shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              More Options 📤
            </motion.button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-body">
          Made with 💖 for {friendName}, the world's best bestie
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
