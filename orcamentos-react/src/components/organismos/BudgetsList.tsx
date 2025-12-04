import { useState, useEffect } from 'react'
import { Budget } from '../../types/budget'
import BudgetCard from '../molecules/BudgetCard'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Label from '../atoms/Label' //8.2.1

interface BudgetsListProps {
  budgets: Budget[] //recebe lista como props
}

export default function BudgetsList({ budgets }: BudgetsListProps) {

  const [sortedBudgets, setSortedBudgets] = useState<Budget[]>(budgets) //7.1 Armazena a lista de orçamentos ordenada
  const [searchTerm, setSearchTerm] = useState<string>('') //8.1.1 Armazena termo de busca

  useEffect(() => { //7.2 Sincroniza com lista original
    setSortedBudgets(budgets)
  }, [budgets])

  const handleSortByName = () => { //7.3 Ordena alfabeticamente
    const sorted = [...sortedBudgets].sort((a, b) => {
      return a.quoteName.localeCompare(b.quoteName)
    })
    setSortedBudgets(sorted)
  }

  const handleSortByDate = () => { //7.4 Ordena por data
    const sorted = [...sortedBudgets].sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
    setSortedBudgets(sorted)
  }

  const handleResetOrder = () => { //7.5 Redefine ordem
    setSortedBudgets(budgets)
  }

  const filteredBudgets = sortedBudgets.filter(budget => { //8.1.2 Filtra orçamentos
    const searchLower = searchTerm.toLowerCase() // converte para minuscula case-insensitive
    const quoteNameLower = budget.quoteName.toLowerCase() 
    return quoteNameLower.includes(searchLower)// verifica se o nome contém o termo
  })

  // 7.6 - Se não houver orçamentos, exibe mensagem
  if (budgets.length === 0) {
    return (
      <div className="budgets-list">
        <h3>Orçamentos em Curso</h3>
        <p>Nenhum orçamento criado ainda.</p>
      </div>
    )
  }
  // 8.1.3 - Se não houver orçamentos filtrados, exibe mensagem
  // 8.2.3 - Campo de busca
  if (filteredBudgets.length === 0 && searchTerm !== '') {
    return (
      <div className="budgets-list">
        <div className="budgets-header">
          <h3>Orçamentos em Curso</h3>
          <div className="sort-buttons">
            <Button onClick={handleSortByName} variant="primary">
              Ordenar por Nome
            </Button>
            <Button onClick={handleSortByDate} variant="primary">
              Ordenar por Data
            </Button>
            <Button onClick={handleResetOrder} variant="primary">
              Redefinir Ordem
            </Button>
          </div>
        </div>
        <div className="search-container">
          <Label htmlFor="search-budget">Buscar orçamento:</Label>
          <Input
            type="text"
            id="search-budget"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do orçamento..."
            className="search-input"
          />
        </div>
        <p>Nenhum orçamento encontrado para "{searchTerm}".</p>
      </div>
    )
  }
  // 7.7 - Se houver orçamentos, exibe lista de orçamentos
  return (
    <div className="budgets-list">

      <div className="budgets-header">
        <h3>Orçamentos em Curso</h3>
        <div className="sort-buttons">
          <Button
            onClick={handleSortByName}
            variant="primary"
            aria-label="Ordenar por nome alfabeticamente"
          >
            Ordenar por Nome
          </Button>
          <Button
            onClick={handleSortByDate}
            variant="primary"
            aria-label="Ordenar por data"
          >
            Ordenar por Data
          </Button>
          <Button
            onClick={handleResetOrder}
            variant="primary"
            aria-label="Redefinir ordem"
          >
            Redefinir Ordem
          </Button>
        </div>
      </div>
      {/* 8.2.2 - Campo de busca */}
      <div className="search-container">
        <Label htmlFor="search-budget">Buscar orçamento:</Label>
        <Input
          type="text"
          id="search-budget"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do orçamento..."
          className="search-input"
        />
        
      </div>
      <div className="budgets-grid">
        {/* 2.1 - Mapeia cada orçamento para BudgetCard */}
        {filteredBudgets.map(budget => ( //8.3 Mapeia orçamentos filtrados
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  )}