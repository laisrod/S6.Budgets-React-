import { useState } from 'react'
import { calculateTotal } from '../utils/calculateBudget'

export function useBudget() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [websitePages, setWebsitePages] = useState<number>(1)
  const [websiteLanguages, setWebsiteLanguages] = useState<number>(1)

  //Adiciona/remove serviços da seleção
  const toggleService = (id: string, checked: boolean): void => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      const novaLista = selectedIds.filter(serviceId => serviceId !== id)
      setSelectedIds(novaLista)
      
      if (id === 'website') {
        setWebsitePages(1)
        setWebsiteLanguages(1)
      }
    }
  }

  const total = calculateTotal(selectedIds, websitePages, websiteLanguages)

  return {
    selectedIds,
    websitePages,
    websiteLanguages,
    toggleService,
    setWebsitePages,
    setWebsiteLanguages,
    total
  }
}

