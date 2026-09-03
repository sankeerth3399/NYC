import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { StickyStorySection } from '../components/home/StickyStorySection';
import { SpecialsSection } from '../components/home/SpecialsSection';
import { HorizontalFoodShowcase } from '../components/home/HorizontalFoodShowcase';
import { MenuPreview } from '../components/home/MenuPreview';
import { StorySection } from '../components/home/StorySection';
import { GallerySection } from '../components/home/GallerySection';
import { WhyMeko } from '../components/home/WhyMeko';
import { LocationSection } from '../components/home/LocationSection';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#05110A] relative">
      <Hero />
      <StickyStorySection />
      <SpecialsSection />
      <HorizontalFoodShowcase />
      <MenuPreview />
      <StorySection />
      <GallerySection />
      <WhyMeko />
      <LocationSection />
    </main>
  );
};
