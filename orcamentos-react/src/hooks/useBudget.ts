import { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { calculateTotal } from '../services/calculateBudget'
import { Budget } from '../types/budget'
import { useLocalStorage } from './useLocalStorage'

export function useBudget() {
  const [searchParams, setSearchParams] = useSearchParams()

  //ler serviços selecionados
  const selectedIds = useMemo(() => {
    const services = searchParams.get('services')
    return services ? services.split(',').filter(Boolean) : []
  }, [searchParams])

  //ler paginas e idiomas da url  
  const websitePages = Number(searchParams.get('pages')) || 1
  const websiteLanguages = Number(searchParams.get('languages')) || 1
  //ler desconto anual da url
  const isAnnualDiscount = searchParams.get('annual') === 'true'

  //Gerenciar orçamentos salvos
  const [budgetsRaw, setBudgetsRaw] = useLocalStorage<Budget[]>('budgets', [])
  //converter datas de string para Date object
  const budgets = useMemo(() => 
    budgetsRaw.map(budget => ({ 
      ...budget, 
      createdAt: budget.createdAt instanceof Date 
      ? budget.createdAt 
      : new Date(budget.createdAt) 
    })),
    [budgetsRaw] 
  )

  //Função auxiliar — atualizar URL - declaração
  const updateParams = useCallback((updates: Record<string, string | null>) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      Object.entries(updates).forEach(([key, value]) => {  //Atualiza cada parâmetro
        if (value === null || value === '') {
          newParams.delete(key) //remove
        } else {
          newParams.set(key, value) //atualiza
        }
      })
      return newParams //retorna novos parametros
    })
  }, [setSearchParams])

  //Função para adicionar ou remover serviços
  const toggleService = useCallback((id: string, checked: boolean): void => {
    let newServices: string[] //array que guardara a nova lista
    
    if (checked) {
      newServices = [...selectedIds, id]
    } else {
      newServices = selectedIds.filter(serviceId => serviceId !== id)
    }

    //objeto que guardara as atualizações
    const updates: Record<string, string | null> = {
      services: newServices.length > 0 ? newServices.join(',') : null
    }

    //Se desmarcar website, remove pages e languages da URL
    if (!checked && id === 'website') {
      updates.pages = null
      updates.languages = null
    }

    //atualiza a URL
    updateParams(updates)
  }, [selectedIds, updateParams])

  //Função para atualizar o numero de paginas
  const setWebsitePages = useCallback((pages: number): void => {
    updateParams({ pages: pages > 1 ? String(pages) : null })
  }, [updateParams])

  //Função para atualizar o numero de idiomas
  const setWebsiteLanguages = useCallback((languages: number): void => {
    updateParams({ languages: languages > 1 ? String(languages) : null })
  }, [updateParams])

  //Função para alternar o desconto anual
  const toggleAnnualDiscount = useCallback((): void => {
    updateParams({ annual: !isAnnualDiscount ? 'true' : null })
  }, [isAnnualDiscount, updateParams])

  //Calcular o total
  const total = calculateTotal(selectedIds, websitePages, websiteLanguages, isAnnualDiscount) 
      
  //Função para adicionar um novo orçamento
  const addBudget = (quoteName: string, clientName: string): void => {
    const originalTotal = calculateTotal(selectedIds, websitePages, websiteLanguages, false) 
    //criar o novo orçamento
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
    //adicionar o novo orçamento à lista
    setBudgetsRaw([...budgets, newBudget]) 
  }

  //retornar os valores e funções
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