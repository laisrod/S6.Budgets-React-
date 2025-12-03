//Funções utilitárias
import { SERVICES } from '../config/ContentService'

//Soma preços dos serviços
export function calculateServicesTotal(selectedIds: string[]): number {
  let total = 0
  for (let i = 0; i < selectedIds.length; i++) {
    const serviceId = selectedIds[i]
    const service = SERVICES.find(s => s.id === serviceId)
    if (service) {
      total = total + service.price
    }
  }
  return total
}

//Custo extra do website
export function calculateWebsiteAdditional(
  isWebsiteSelected: boolean,
  pages: number,
  languages: number
): number {
  if (!isWebsiteSelected) {
    return 0
  }
  return (pages + languages) * 30
}

// 5.2 - Calcula total // 9.2.1 atualizar
export function calculateTotal(
  selectedIds: string[],
  websitePages: number,
  websiteLanguages: number,
  isAnnualDiscount: boolean = false
): number {
  const servicesTotal = calculateServicesTotal(selectedIds)
  const isWebsiteSelected = selectedIds.includes('website')
  const websiteAdditional = calculateWebsiteAdditional(
    isWebsiteSelected,
    websitePages,
    websiteLanguages
  )
  
  let total = servicesTotal + websiteAdditional
  
  if (isAnnualDiscount) {
    total = total * 0.8  // 20% de desconto = multiplicar por 0.8
  }
  
  return total
}

