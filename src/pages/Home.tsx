import React, { useEffect } from 'react';
import { CinematicHUDNav } from '../components/home/CinematicHUDNav';
import { Hero } from '../components/home/Hero';
import { DeconstructedBuildSection } from '../components/home/DeconstructedBuildSection';
import { InTheBoxSection } from '../components/home/InTheBoxSection';
import { TheLineUpSection } from '../components/home/TheLineUpSection';
import { TheSearSection } from '../components/home/TheSearSection';
import { TheCutSection } from '../components/home/TheCutSection';
import { TheStoryTimeline } from '../components/home/TheStoryTimeline';
import { ReservePickupHUD } from '../components/home/ReservePickupHUD';
import { LocationSection } from '../components/home/LocationSection';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden bg-[#070707] text-white">
      {/* Top Technical HUD Nav (Reference Video Section Jumps) */}
      <CinematicHUDNav />

      {/* Hero (Frame 00:00) */}
      <Hero />

      {/* Deconstructed Build / Exploded Burger (Frame 00:01 & 00:02) */}
      <DeconstructedBuildSection />

      {/* In The Box / Packed Six Stars (Frame 00:03 - 00:05) */}
      <InTheBoxSection />

      {/* The Line-Up (Frame 00:06) */}
      <TheLineUpSection />

      {/* The Sear / Flat-Top Heat (Frame 00:08 - 00:10) */}
      <TheSearSection />

      {/* The Cut / Artisan Craft (Frame 00:11 - 00:12) */}
      <TheCutSection />

      {/* The Story / Sunset Ave Timeline (Frame 00:13) */}
      <TheStoryTimeline />

      {/* Order & Pickup Terminal HUD (Frame 00:14) */}
      <ReservePickupHUD />

      {/* Neighborhood Location & Directions */}
      <LocationSection />
    </main>
  );
};
