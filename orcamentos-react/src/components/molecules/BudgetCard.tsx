import { Budget } from '../../types/budget'
import { SERVICES } from '../../config/ContentService'
import Span from '../atoms/Span'
import Strong from '../atoms/Strong'

interface BudgetCardProps {
  budget: Budget
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const getServiceLabels = () => {
    return budget.selectedServices.map(serviceId => {
      const service = SERVICES.find(s => s.id === serviceId)
      if (service) {
        if (serviceId === 'website' && budget.websitePages && budget.websiteLanguages) {
          return `${service.label} (${budget.websitePages} páginas, ${budget.websiteLanguages} idiomas)`
        }
        return service.label
      }
      return serviceId
    })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="budget-card">
      <div className="budget-header">
        <Strong>{budget.quoteName}</Strong>
        <Span className="budget-date">{formatDate(budget.createdAt)}</Span>
      </div>
      
      <div className="budget-client">
        <Span><Strong>Cliente:</Strong> {budget.clientName}</Span>
      </div>

      <div className="budget-services">
        <Span><Strong>Serviços contratados:</Strong></Span>
        <ul>
          {getServiceLabels().map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      </div>

      <div className="budget-total">
        {budget.isAnnualDiscount && budget.originalTotal && (
          <Span className="budget-card__original">
            € {budget.originalTotal}
          </Span>
        )}
        <Strong>Total: € {budget.total}</Strong>
        {budget.isAnnualDiscount && (
          <Span className="budget-card__discount-badge">
            20% OFF
          </Span>
        )}
      </div>
    </div>
  )
}