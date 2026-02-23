import { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { calculateTotal } from '../services/calculateBudget'
import { Budget } from '../types/budget'
import { useLocalStorage } from './useLocalStorage'

export function useBudget() {
  const [searchParams, setSearchParams] = useSearchParams()

  //processando serviços selecionados
  const selectedIds = useMemo(() => {
    const services = searchParams.get('services')
    return services ? services.split(',').filter(Boolean) : []
  }, [searchParams])

  const websitePages = Number(searchParams.get('pages')) || 1
  const websiteLanguages = Number(searchParams.get('languages')) || 1
  const isAnnualDiscount = searchParams.get('annual') === 'true'

  // Armazena os orçamentos em localStorage
  const [budgetsRaw, setBudgetsRaw] = useLocalStorage<Budget[]>('budgets', []) //  passo 1 useBudget usa useLocalStorage**
  const budgets = useMemo(() => //passo 2 useBudget processa os dados
    budgetsRaw.map(budget => ({ 
      ...budget, 
      createdAt: budget.createdAt instanceof Date 
      ? budget.createdAt 
      : new Date(budget.createdAt) 
    })),
    [budgetsRaw] 
  )

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })
      return newParams
    })
  }, [setSearchParams])

  const toggleService = useCallback((id: string, checked: boolean): void => {
    let newServices: string[]
    
    if (checked) {
      newServices = [...selectedIds, id]
    } else {
      newServices = selectedIds.filter(serviceId => serviceId !== id)
    }

    const updates: Record<string, string | null> = {
      services: newServices.length > 0 ? newServices.join(',') : null
    }

    if (!checked && id === 'website') {
      updates.pages = null
      updates.languages = null
    }

    updateParams(updates)
  }, [selectedIds, updateParams])

  const setWebsitePages = useCallback((pages: number): void => {
    updateParams({ pages: pages > 1 ? String(pages) : null })
  }, [updateParams])

  const setWebsiteLanguages = useCallback((languages: number): void => {
    updateParams({ languages: languages > 1 ? String(languages) : null })
  }, [updateParams])

  const toggleAnnualDiscount = useCallback((): void => {
    updateParams({ annual: !isAnnualDiscount ? 'true' : null })
  }, [isAnnualDiscount, updateParams])

  const total = calculateTotal(selectedIds, websitePages, websiteLanguages, isAnnualDiscount) 
      
  const addBudget = (quoteName: string, clientName: string): void => {
    const originalTotal = calculateTotal(selectedIds, websitePages, websiteLanguages, false) 
    const newBudget: Budget = {
      id: Date.now().toString(),
      quoteName,
      clientName,
      selectedServices: [...selectedIds],
      websitePages: selectedIds.includes('website') ? websitePages : undefined,
      websiteLanguages: selectedIds.includes('website') ? websiteLanguages : undefined,
      createdAt: new Date(),
      isAnnualDiscount: isAnnualDiscount,
      originalTotal: isAnnualDiscount ? originalTotal : undefined,
      total
    }
    setBudgetsRaw([...budgets, newBudget]) 
  }

  return {
    selectedIds,
    websitePages,
    websiteLanguages,
    toggleService,
    setWebsitePages,
    setWebsiteLanguages,
    total,
    budgets, 
    addBudget, 
    isAnnualDiscount,
    toggleAnnualDiscount 
  }
}