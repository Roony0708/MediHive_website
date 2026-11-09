export interface Doctor {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  hospital: string;
  hospitalId: string;
  image: string;
  availability: string;
  fee: number;
  education: string;
  languages: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
}

export interface Hospital {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  address: string;
  phone: string;
  emergency: boolean;
}

export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  tests: string[];
  duration: string;
  popular: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  author: { name: string; image: string; role: string; };
  image: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  doctorCount: number;
}
