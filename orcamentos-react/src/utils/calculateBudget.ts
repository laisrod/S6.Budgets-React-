import { SERVICES } from '../constants/services'

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
//soma total
export function calculateTotal(
  selectedIds: string[],
  websitePages: number,
  websiteLanguages: number
): number {
  const servicesTotal = calculateServicesTotal(selectedIds)
  const isWebsiteSelected = selectedIds.includes('website')
  const websiteAdditional = calculateWebsiteAdditional(
    isWebsiteSelected,
    websitePages,
    websiteLanguages
  )
  return servicesTotal + websiteAdditional
}

