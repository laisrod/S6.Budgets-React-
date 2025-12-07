import { useState, useEffect } from 'react'
import { Budget } from '../../types/budget'
import BudgetCard from '../molecules/BudgetCard'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Label from '../atoms/Label' 

interface BudgetsListProps {
  budgets: Budget[] //recebe lista como props
}

export default function BudgetsList({ budgets }: BudgetsListProps) {

  const [sortedBudgets, setSortedBudgets] = useState<Budget[]>(budgets)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    setSortedBudgets(budgets)
  }, [budgets])

  const handleSortByName = () => {
    const sorted = [...sortedBudgets].sort((a, b) => {
      return a.quoteName.localeCompare(b.quoteName)
    })
    setSortedBudgets(sorted)
  }

  const handleSortByDate = () => {
    const sorted = [...sortedBudgets].sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
    setSortedBudgets(sorted)
  }

  const handleResetOrder = () => {
    setSortedBudgets(budgets)
  }

  const filteredBudgets = sortedBudgets.filter(budget => {
    const searchLower = searchTerm.toLowerCase() // converte para minuscula case-insensitive
    const quoteNameLower = budget.quoteName.toLowerCase() 
    return quoteNameLower.includes(searchLower)
  })

  if (budgets.length === 0) {
    return (
      <div className="budgets-list">
        <h3>Orçamentos em Curso</h3>
        <p>Nenhum orçamento criado ainda.</p>
      </div>
    )
  }
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
        {filteredBudgets.map(budget => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  )}