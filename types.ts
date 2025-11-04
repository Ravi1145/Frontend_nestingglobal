
export enum Page {
  Home,
  Properties,
  PropertyDetail,
  About,
  Contact,
}

export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Commercial' | 'Off-Plan';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; 
  type: PropertyType;
  status: 'Featured' | 'New' | 'For Sale';
  images: string[];
  description: string;
  amenities: string[];
  agent: {
    name: string;
    image: string;
  };
  coordinates: { lat: number; lng: number };
}

export interface Agent {
  id: number;
  name: string;
  title: string;
  image: string;
  linkedin: string;
  email: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
}
