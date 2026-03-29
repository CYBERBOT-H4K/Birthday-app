import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import HeartTrail from "@/components/HeartTrail";
import MemoryBubbles from "@/components/MemoryBubbles";
import BlossomMemories from "@/components/BlossomMemories";
import BestieAvatar from "@/components/BestieAvatar";
import SurpriseReveal from "@/components/SurpriseReveal";
import CakeSmash from "@/components/CakeSmash";
import CareMeter from "@/components/CareMeter";
import MessageBox from "@/components/MessageBox";
import BestieBadge from "@/components/BestieBadge";
import MusicToggle from "@/components/MusicToggle";
import Footer from "@/components/Footer";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [interactions, setInteractions] = useState(0);

  const trackInteraction = useCallback(() => {
    setInteractions((prev) => prev + 1);
  }, []);

  const handleStart = () => {
    setStarted(true);
    trackInteraction();
    // Smooth scroll to content
    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background" onClick={trackInteraction}>
      <HeartTrail />
      <MusicToggle />

      <HeroSection onStart={handleStart} />

      {started && (
        <div id="content">
          <BlossomMemories />
          <MemoryBubbles />
          <BestieAvatar />
          <SurpriseReveal />
          <CakeSmash />
          <MessageBox />
          <CareMeter interactions={interactions} maxInteractions={30} />
          <BestieBadge />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
