import type { BusinessInfo } from '../types';

export const businessData: BusinessInfo = {
  name: "Meko Deli & Grocery",
  legalName: "Meko Deli & Grocery Inc.",
  tagline: "Sandwiches, Groceries & More",
  address: {
    street: "1510 Sunset Ave",
    city: "Utica",
    state: "NY",
    zip: "13502",
    full: "1510 Sunset Ave, Utica, NY 13502",
  },
  phone: "(315) 864-3000",
  phoneRaw: "3158643000",
  whatsapp: "+1 (315) 864-3000",
  whatsappRaw: "13158643000",
  whatsappUrl: "https://wa.me/13158643000",
  emailContactPlaceholder: "contact@mekobites.com",
  hours: [
    { days: "Monday - Sunday", time: "7:00 AM - 10:00 PM" },
  ],
  googleMapsUrl: "https://maps.google.com/?q=1510+Sunset+Ave,+Utica,+NY+13502",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.4683140605543!2d-75.25332128735577!3d43.09467217101379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9412c82300b43%3A0x511eb16189f5fd1a!2s1510%20Sunset%20Ave%2C%20Utica%2C%20NY%2013502!5e0!3m2!1sen!2sus!4v1725992985766!5m2!1sen!2sus",
  coordinates: {
    lat: 43.094672,
    lng: -75.253321,
  },
  features: [
    {
      title: "Fresh Ingredients Daily",
      description: "From daily fresh chicken cuts and premium deli meats to crisp produce, quality is never compromised.",
      icon: "Sparkles",
    },
    {
      title: "Generous Portions",
      description: "Stacked hero sandwiches, hearty rice platters, and loaded burgers packed with real flavor.",
      icon: "Flame",
    },
    {
      title: "Quick Grill Service",
      description: "Hot, fast, and cooked to order so you get your meals fresh off the grill without the long wait.",
      icon: "Clock",
    },
    {
      title: "Neighborhood Convenience",
      description: "Your trusted corner destination in Utica for hot meals, cold drinks, snacks, and daily household items.",
      icon: "Store",
    },
  ],
};

export const aboutStory = {
  heading: "Your Neighborhood Deli & Grocery in Utica, NY",
  lead: "Welcome to Meko Deli and Grocery, your neighborhood's hidden gem in Utica, NY! At Meko Deli, we pride ourselves on offering the freshest chicken cuts and juicy wings that will tantalize your taste buds.",
  bodyParagraphs: [
    "From savory deli items to carefully selected grocery essentials and smoking products, our corner store is your one-stop shop for all your cravings. Step into Meko Deli and Grocery and experience a symphony of flavors that will transport you to a culinary paradise.",
    "Whether you're in the mood for a satisfying hot sandwich, need to stock up on household essentials, or looking for premium convenience items, we've got you covered. Our commitment to quality is unmatched, ensuring that every bite you take is a delight for your senses.",
    "Come visit us at 1510 Sunset Ave and treat yourself to a unique neighborhood shopping experience filled with delectable delights. Let us be your go-to destination for all things delicious and convenient. Your taste buds will thank you!"
  ],
  pillars: [
    {
      title: "Fresh Food & Hot Grill",
      desc: "Made-to-order sandwiches, gyros, rice platters, and fresh chicken cuts seasoned and cooked hot.",
      badge: "Grill & Deli",
    },
    {
      title: "Neighborhood Favorite",
      desc: "Proudly serving our Utica community on Sunset Ave with friendly, fast, and welcoming service.",
      badge: "Utica Local",
    },
    {
      title: "Deli + Grocery In One",
      desc: "Complete corner store convenience with drinks, snacks, daily groceries, and hot kitchen specials.",
      badge: "One-Stop Shop",
    },
  ]
};
