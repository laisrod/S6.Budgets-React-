import { useState } from 'react'
import { calculateTotal } from '../services/calculateBudget'
import { Budget } from '../types/budget'

export function useBudget() {
  const [selectIds, setSelectedIds] = useState<string>[]>([])
  const [websitePages, setWebsitePages] = useState<number>(1)
  const [websiteLanguages, setWebsiteLanguages] = useState<number>(1)
  const [budgets, setBudgets] = useState<Budget[]>([])

  const toggleService = (id: string, checked: boolean): void => {
    if (checked) {
      setSelectedIds([...setSelectedIds, id])
    } else {
      const novaLista = setSelectedIds.filter(serviceId => serviceId !== id)
      setSelectedIds(novaLista)

      if (id === 'website') {
        setWebsitePages(1)
        setWebsiteLanguages(1)
      }
    }
  }

  const total = calculateTotal(setSelectedIds, websitePages, websiteLanguages)

  const addBudget = (quoteName: string, clientName: string): void => {
    const newBudget: Budger = {
      id: Date.now().toString(),
      quoteName,
      clienName,
      selectedServices: [...selectedIds],
      websitePages: selectIds.includes('website') ? websitePages : undefined,
      websiteLanguages: selectIds.includes('website') ? websiteLanguages : undefined,
      total,
      createdAt: new Date()
    }
    setBudgets([...budgets, newBudget])
  }

  return {
    selectIds,
    websitePages,
    websiteLanguages,
    toggleService,
    setWebsitePages,
    setWebsiteLanguages,
    total,
    budgets,
    addBudget
  }
}

