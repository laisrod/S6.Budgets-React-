import { createContext, useContext, useState, ReactNode } from 'react'
import { calculateTotal } from '../services/calculateBudget'

interface BudgetContextType {
  selectedIds: string[]
  websitePages: number
  websiteLanguages: number
  toggleService: (id: string, checked: boolean) => void
  setWebsitePages: (pages: number) => void
  setWebsiteLanguages: (languages: number) => void
  total: number
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

interface BudgetProviderProps {
  children: ReactNode
}

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [websitePages, setWebsitePages] = useState<number>(1)
  const [websiteLanguages, setWebsiteLanguages] = useState<number>(1)

  // Adiciona/remove serviços da seleção
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

  const value: BudgetContextType = {
    selectedIds,
    websitePages,
    websiteLanguages,
    toggleService,
    setWebsitePages,
    setWebsiteLanguages,
    total
  }

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudgetContext() {
  const context = useContext(BudgetContext)
  if (context === undefined) {
    throw new Error('useBudgetContext deve ser usado dentro de um BudgetProvider')
  }
  return context
}

