export type ThemeCategory = 
  | 'All'
  | 'Modern Minimalist'
  | 'Rustic Earth'
  | 'Luxury Royal Gold'
  | 'Animated Motion';

export interface ThemeItem {
  id: string;
  name: string;
  category: ThemeCategory;
  description: string;
  badge?: string;
  previewImage: string;
  palette: string[];
  bgStyle: string;
  accentColor: string;
  fontFamily: string;
  isPopular?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  badge?: string;
  isFeatured?: boolean;
  features: { text: string; included: boolean; highlight?: boolean }[];
  ctaText: string;
  whatsappMessage: string;
}

export interface Testimonial {
  id: string;
  couple: string;
  location: string;
  quote: string;
  themeUsed: string;
  rating: number;
  date: string;
  avatar: string;
  shortStory: string;
  guestsInvited: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface InvitationData {
  groomName: string;
  brideName: string;
  groomFull: string;
  brideFull: string;
  weddingDate: string;
  venueName: string;
  venueAddress: string;
  receptionTime: string;
  akadTime: string;
  themeId: string;
  guestName: string;
  isOpened: boolean;
  activeTab: 'home' | 'couple' | 'event' | 'wishes' | 'gift';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
