import React from 'react';

export interface NavLink {
  name: string;
  path: string;
  children?: NavLink[];
}

export interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export interface FeaturedCapability {
  title: string;
  description: string;
  imageUrl: string;
}

export interface Sector {
  name:string;
  slug: string;
  description: string;
  imageUrl: string;
  details: {
    title: string;
    subtitle: string;
    use_cases: {
      title: string;
      description: string;
    }[];
    featured_capabilities?: FeaturedCapability[];
  };
}

export interface Integration {
  name: string;
  category: 'E-Ticaret & Pazaryerleri' | 'Sosyal Medya' | 'CRM & İş Yönetimi' | 'Yardımcı Araçlar';
  icon: React.ReactElement;
  features: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

export interface PricingDetails {
  setupFee: number;
  monthlyFee: number;
  annualFee: number;
}

// FIX: Added missing PricingPlan interface
export interface PricingPlan {
  name: string;
  popular?: boolean;
  price: {
    monthly: number;
    annually: number;
    lifetime: number;
  } | string;
  features: string[];
}

export interface PricingTier {
    name: string;
    minutes: number;
    features: string[];
    monthlyPrice: number;
    annualPrice?: number;
    originalMonthlyPrice?: number;
    annualBillingText?: string;
    popular?: boolean;
}

export interface SocialMediaPricingDetails {
    monthly: number;
    sixMonths: number; // Price per month for 6 month package
    annually: number; // Price per month for 12 month package
}

export interface SocialMediaPricingPlan {
    name: string;
    prices: SocialMediaPricingDetails;
    originalPrices: SocialMediaPricingDetails;
    features: string[];
    popular?: boolean;
    paymentLink?: string;
}

export interface SetupFee {
    original: number;
    discounted: number;
}

export interface HowItWorksStep {
    icon: string;
    title: string;
    description: string;
}

export interface AutomationSolution {
  name: string;
  slug: string;
  shortDescription: string;
  title: string;
  description: string;
  imageUrl: string;
  keyFeatures: {
    icon: string;
    title: string;
    description: string;
  }[];
  features?: any[];
  benefits?: any[];
  aiFeatures?: any;
  targetAudience?: any[];
  pricing?: PricingDetails;
  problemSolution?: {
    problem: string;
    solution: string;
  }[];
  whyChooseUs?: {
      icon: string;
      title: string;
      description: string;
  }[];
  ourGoal?: {
      title: string;
      description: string;
  };
  pricingPlans?: SocialMediaPricingPlan[];
  setupFee?: SetupFee;
  howItWorks?: HowItWorksStep[];
  integrations?: {
      title: string;
      description: string;
      logos: {
          name: string;
          logoUrl: string;
      }[];
  };
  socialProof?: {
      count: number;
      label: string;
  };

  // New fields for Voice Agent
  whatIsIt?: {
    title: string;
    description: string;
    mainFeatures: string[];
    benefits: string[];
  };
  packageScope?: {
    title: string;
    included: { title: string; items: string[] };
    projectBased: { title: string; items: string[] };
    note: string;
  };
  selectionCriteria?: {
    title: string;
    criteria: {
      title: string;
      description: string;
    }[];
  };
  individualPricing?: {
    title: string;
    plans: PricingTier[];
    notes: string[];
  };
  corporatePricing?: {
    title: string;
    plans: PricingTier[];
    notes: string[];
  };
}


export interface ApplicationPricing {
  monthly: number;
  annually: number;
  lifetime: number;
}

export interface AiFeatures {
  title: string;
  subtitle: string;
  features: {
      icon: string;
      title: string;
      description: string;
  }[];
}

export interface Application {
  name: string;
  slug: string;
  sector: string;
  description: string;
  imageUrl: string;
  title: string;
  longDescription: string;
  features: {
    icon: string;
    title: string;
    description: string;
    imageUrl?: string;
    category?: string;
  }[];
  benefits?: {
    icon: string;
    title: string;
    description: string;
  }[];
  targetAudience?: {
    icon: string;
    name: string;
  }[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  problemSolution?: {
    icon: string;
    title: string;
    description: string;
  }[];
  platformDeepDive?: {
    icon: string;
    title: string;
    description: string;
  }[];
  keyIntegrations?: {
    name: string;
    logoUrl: string;
  }[];
  references?: Reference[];
  directBookingRevolution?: {
    title: string;
    subtitle: string;
    features: {
        icon: string;
        title: string;
        description: string;
    }[];
  };
  competitiveEdge?: {
    title: string;
    subtitle: string;
    features: {
        icon: string;
        title: string;
        description: string;
    }[];
  };
  pricing?: ApplicationPricing;
  aiFeatures?: AiFeatures;
  problem?: string;
  solution?: string;
  goal?: string;
  whyChooseUs?: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface Reference {
  name: string;
  logoUrl: string;
}

export interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  authorName: string;
  authorAvatarUrl: string;
  publishedDate: string;
  content: React.ReactElement;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface ValueProposition {
    icon: string;
    title: string;
    description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PressMention {
  publicationLogoUrl: string;
  title: string;
  link: string;
  date: string;
}

export type AppointmentStatus = 'Yaklaşan' | 'Tamamlandı' | 'İptal Edildi';

export interface Appointment {
  id: number;
  clientName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  service: string;
  status: AppointmentStatus;
  isConfirmed: boolean;
  reminderNote?: string;
  aiBriefing?: string;
  reminderSent?: boolean;
}

// Task Management Types
export type TaskStatus = 'Yapılacak' | 'Devam Ediyor' | 'Tamamlandı';
export type TaskPriority = 'Düşük' | 'Orta' | 'Yüksek';

export interface Subtask {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo: string[];
  subtasks: Subtask[];
  comments: Comment[];
  dependencies: string[];
  projectId?: string;
}

// CRM Types
export type CustomerStatus = 'Aktif' | 'Potansiyel' | 'Pasif';

export interface Note {
  id: string;
  content: string;
  timestamp: string;
}

export interface CrmAppointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface FinancialRecord {
  id: string;
  type: 'Gelir' | 'Gider';
  amount: number;
  date: string;
  status: 'Tamamlandı' | 'Beklemede';
  description: string;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  totalRevenue: number;
  lastInteraction: string; // ISO date string
  notes: Note[];
  tags?: string[];
  appointments?: CrmAppointment[];
  financials?: FinancialRecord[];
  aiSummary?: string;
  aiNextAction?: string;
  aiChurnRisk?: {
    risk: 'Düşük' | 'Orta' | 'Yüksek';
    reason: string;
    analyzedDate: string;
  };
}

// Cold Calling Types
export type SogukAramaDurum = 'Aranacak' | 'Ulaşılamadı' | 'Geri Ara' | 'Randevu Alındı' | 'İlgilenmiyor';
export type CallOutcome = 'Ulaşıldı - İlgili' | 'Ulaşıldı - İlgisiz' | 'Meşgul' | 'Cevap Vermedi';

export interface CallLog {
  timestamp: string;
  outcome: CallOutcome;
  notes: string;
}

export interface SogukArama {
  id: string;
  firmaAdi: string;
  yetkili: string;
  telefon: string;
  durum: SogukAramaDurum;
  notlar: string;
  sonTemas: string; // ISO Date String
  sektor?: string;
  aiScore?: number;
  aiCallScript?: string;
  aiEmailDraft?: {
    subject: string;
    body: string;
  };
  aiNextStep?: string;
  callHistory?: CallLog[];
}

// Bulk Email Types
export interface MailList {
  id: string;
  name: string;
  emails: string[];
}

// Partner Management Types
export type PartnerTier = 'Gold' | 'Silver' | 'Bronze';
export type PartnerStatus = 'Aktif' | 'Pasif';

export interface Partner {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  tier: PartnerTier;
  commissionRate: number; // Percentage
  status: PartnerStatus;
  referralLink: string;
  joinDate: string; // ISO date string
}

export interface Referral {
  id: string;
  customerName: string;
  customerId: string;
  partnerId: string;
  registrationDate: string; // ISO date string
  totalRevenue: number;
  commissionGenerated: number;
  status: 'Ödendi' | 'Beklemede';
}

// Quote & Invoice Types
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type QuoteStatus = 'Taslak' | 'Gönderildi' | 'Kabul Edildi' | 'Reddedildi';

export interface Quote {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  clientCompany?: string;
  issueDate: string; // ISO date string
  expiryDate: string; // ISO date string
  items: LineItem[];
  subtotal: number;
  discount: number; // can be percentage or fixed amount
  tax: number; // percentage
  total: number;
  introText: string;
  closingText: string;
  status: QuoteStatus;
}

export type InvoiceStatus = 'Taslak' | 'Gönderildi' | 'Ödendi' | 'Gecikti' | 'İptal Edildi';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  quoteId?: string;
  clientId?: string;
  clientName: string;
  clientCompany?: string;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  items: LineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amountPaid: number;
  notes: string;
  status: InvoiceStatus;
  isRecurring: boolean;
  recurrenceFrequency?: 'Aylık' | '3 Aylık' | 'Yıllık';
  invoiceImage?: string;
}

export interface ExpenseInvoice {
  id: string;
  description: string;
  vendor: string;
  amount: number;
  date: string; // ISO date string
  category: string;
  invoiceImage: string; // base64 encoded image
}

export interface Talep {
  id: string;
  name: string;
  companyName: string;
  website: string;
  helpTopic: 'Bilmiyorum' | 'Müşteri hizmetleri' | 'İçerik üretimi' | 'Otomasyonlar' | 'Diğer';
  employeeCount: string;
  phone: string;
  notes: string;
  submittedAt: string; // ISO date string
  status: 'Yeni' | 'İncelendi' | 'İletişime Geçildi';
}

export interface SectorPricingDetails {
    monthly: number;
    threeMonths: number;
    sixMonths: number;
    annually: number;
}

export interface SectorPricingTier {
    name: string;
    description: string;
    prices: SectorPricingDetails;
    features: string[];
    popular?: boolean;
}

export interface SectorPricingPlan {
    sectorSlug: string;
    tiers: SectorPricingTier[];
    setupFee: number;
}