import { useState, useMemo } from 'react'
import { calculateTotal } from '../services/calculateBudget'
import { Budget } from '../types/budget'
import { useLocalStorage } from './useLocalStorage'

export function useBudget() {
  // 1. Gerencia estados
  const [selectedIds, setSelectedIds] = useState<string[]>([]) //exercicio 1 fase 2
  const [websitePages, setWebsitePages] = useState<number>(1)
  const [websiteLanguages, setWebsiteLanguages] = useState<number>(1)
  const [isAnnualDiscount, setIsAnnualDiscount] = useState<boolean>(false) //9.1.1 - estado para desconto anual

  //lista de orçamentos - usando hook useLocalStorage (já faz carregar + salvar automaticamente)
  const [budgetsRaw, setBudgetsRaw] = useLocalStorage<Budget[]>('budgets', [])
  // Converter createdAt de string para Date (só recalcula quando budgetsRaw muda)
  // useMemo é um hook que memoriza o resultado de uma função e retorna o resultado memorizado
  //// Carrega do localStorage na inicialização e memoriza o resultado
  const budgets = useMemo(() => 
    budgetsRaw.map(budget => ({ //percorre cada orçamento em budgetsRaw
      ...budget, //copia todas as propriedades do budget
      createdAt: budget.createdAt instanceof Date //Conversão de Date
      ? budget.createdAt // Já é Date? Mantém
      : new Date(budget.createdAt) //converte string para Date se necessário
    })),
    [budgetsRaw] // so recalcula quando budgetsRaw muda
  )

// 3. Funções para atualizar o estado
  const toggleService = (id: string, checked: boolean): void => {
    if (checked) {
      //se checkbox foi marcado, adiciona ao array
      setSelectedIds([...selectedIds, id])
    } else {
      //se checkbox foi desmarcado, remove do array
      const novaLista = selectedIds.filter(serviceId => serviceId !== id)
      setSelectedIds(novaLista)
      
      if (id === 'website') {
        //se desmarcou website, reseta páginas e idiomas
        setWebsitePages(1)
        setWebsiteLanguages(1)
      }
    }
  }

  //9.1.2 - função para alternar o desconto anual
  const toggleAnnualDiscount = (): void => {
    setIsAnnualDiscount(!isAnnualDiscount)
  }

  // 5.1 - Calcula total
  const total = calculateTotal(selectedIds, websitePages, websiteLanguages, isAnnualDiscount) //9.2.2 - passa o estado de desconto anual
      

  const addBudget = (quoteName: string, clientName: string): void => {
    const originalTotal = calculateTotal(selectedIds, websitePages, websiteLanguages, false) //9.6.4 - calcula total sem desconto

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
    
    setBudgetsRaw([...budgets, newBudget]) // Atualiza estado (useLocalStorage salva automaticamente)
  }

  // 4 - retorna tudo que os componentes precisam
  return {
    selectedIds,
    websitePages,
    websiteLanguages,
    toggleService,
    setWebsitePages,
    setWebsiteLanguages,
    total,
    budgets, //exporta lista
    addBudget, //exporta função para adicionar
    isAnnualDiscount,
    toggleAnnualDiscount //9.1.3 exporta função para alternar o desconto anual
  }
}
