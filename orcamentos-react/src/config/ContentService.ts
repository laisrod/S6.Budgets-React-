export interface Service {
  id: string;
  label: string;
  price: number;
}

export const SERVICES: Service[] = [
  { id: 'seo', label: 'Realizar uma campanha de SEO', price: 300 },
  { id: 'ads', label: 'Realizar uma campanha publicitária', price: 400 },
  { id: 'website', label: 'Criar um site', price: 500 },
];

