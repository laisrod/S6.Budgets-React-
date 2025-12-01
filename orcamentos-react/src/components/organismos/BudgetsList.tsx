import { useState, useEffect } from 'react'
import { Budget } from '../../types/budget'
import BudgetCard from '../molecules/BudgetCard'
import Button from '../atoms/Button'


interface BudgetsListProps {
  budgets: Budget[]
}

export default function BudgetsList({ budgets }: BudgetsListProps) {

  const [sortedBudgets, setSortedBudgets] = useState<Budget[]>(budgets) //sortedBudgets: Armazena a lista de orçamentos ordenada
  
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

  // 1 - Se não houver orçamentos, exibe mensagem
  if (budgets.length === 0) {
    return (
      <div className="budgets-list">
        <h3>Orçamentos em Curso</h3>
        <p>Nenhum orçamento criado ainda.</p>
      </div>
    )
  }
  // 2 - Se houver orçamentos, exibe lista de orçamentos
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
      <div className="budgets-grid">
        {/* 2.1 - Mapeia cada orçamento para BudgetCard */}
        {sortedBudgets.map(budget => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  )}