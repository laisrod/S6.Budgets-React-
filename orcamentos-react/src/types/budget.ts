export interface Budget {
  id: string;
  quoteName: string;
  clientName: string;
  selectedServices: string[];
  websitePages?: number;
  websiteLanguages?: number;
  total: number;
  createdAt: Date;
  isAnnualDiscount?: boolean;
  originalTotal?: number;
}

export interface Service {
  id: string;
  label: string;
  price: number;
}