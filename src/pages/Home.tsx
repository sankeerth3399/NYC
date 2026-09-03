import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { SpecialsSection } from '../components/home/SpecialsSection';
import { MenuPreview } from '../components/home/MenuPreview';
import { WhyMeko } from '../components/home/WhyMeko';
import { StorySection } from '../components/home/StorySection';
import { GallerySection } from '../components/home/GallerySection';
import { LocationSection } from '../components/home/LocationSection';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden">
      <Hero />
      <SpecialsSection />
      <MenuPreview />
      <WhyMeko />
      <StorySection />
      <GallerySection />
      <LocationSection />
    </main>
  );
};
