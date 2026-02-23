import ServiceCheckbox from '../components/organismos/ServiceCheckbox'
import Total from '../components/organismos/Total'
import WebsiteOptions from '../components/organismos/WebsiteOptions'
import QuoteForm from '../components/organismos/QuoteForm'
import BudgetsList from '../components/organismos/BudgetsList'
import { SERVICES } from '../config/ContentService'
import { useBudget } from '../hooks/useBudget'
import { Link } from 'react-router-dom'
import AnnualDiscountToggle from '../components/molecules/AnnualDiscountToggle'

export default function Calculator() {
  const {
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
  } = useBudget()

  return (
    <div className="container">
      <header className="calc-header">
        <h1>Orçamento de Serviços</h1>
        <Link to="/" className="btn btn-secondary">
          Voltar para a tela inicial
        </Link>
      </header>

      <div className="services">  
        {SERVICES.map(service => (
          <ServiceCheckbox
            key={service.id}
            id={service.id}
            label={service.label}
            price={service.price}
            checked={selectedIds.includes(service.id)}
            onChange={toggleService}
          />
        ))}
      </div>

      {selectedIds.includes('website') && (
        <WebsiteOptions
          pages={websitePages}
          languages={websiteLanguages}
          onPagesChange={setWebsitePages}
          onLanguagesChange={setWebsiteLanguages}
        />
      )}

      <AnnualDiscountToggle
        isChecked={isAnnualDiscount}
        onChange={toggleAnnualDiscount}
        discount={20}
      />

      <Total 
        amount={total} 
        originalAmount={isAnnualDiscount ? total : undefined}
        isAnnualDiscount={isAnnualDiscount}
      />

      <QuoteForm 
      onSubmit={addBudget} 
      isAnnualDiscount={isAnnualDiscount}
      />

      <BudgetsList 
      budgets={budgets} 
      />
    </div>
  )
}