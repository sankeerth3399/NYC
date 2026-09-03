export type MenuCategory = 
  | 'all'
  | 'breakfast'
  | 'cold-cuts'
  | 'cheese'
  | 'rice-specials'
  | 'gyro'
  | 'salads'
  | 'hot-sandwiches'
  | 'burgers'
  | 'fries'
  | 'fried-food';

export interface PriceTier {
  label: string;
  price: number | string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  priceDisplay: string;
  basePrice?: number;
  tiers?: PriceTier[];
  image?: string;
  popular?: boolean;
  spicy?: boolean;
  featured?: boolean;
  tags?: string[];
}

export interface SpecialItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
  availableDays?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  span?: 'tall' | 'wide' | 'normal';
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phone: string;
  phoneRaw: string;
  whatsapp?: string;
  whatsappRaw?: string;
  whatsappUrl?: string;
  emailContactPlaceholder: string;
  hours: {
    days: string;
    time: string;
  }[];
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}
