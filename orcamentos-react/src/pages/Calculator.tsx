import ServiceCheckbox from '../components/organismos/ServiceCheckbox'
import Total from '../components/organismos/Total'
import WebsiteOptions from '../components/organismos/WebsiteOptions'
import QuoteForm from '../components/organismos/QuoteForm'
import BudgetsList from '../components/organismos/BudgetsList'
import { SERVICES } from '../config/ContentService'
import { useBudget } from '../hooks/useBudget'
import { Link } from 'react-router-dom'
import AnnualDiscountToggle from '../components/molecules/AnnualDiscountToggle' //9.5.1
import { calculateTotal } from '../services/calculateBudget' //9.5.3 - importar função de cálculo

export default function Calculator() {
  // 1 - Desestruturação do hook para pegar tudo que o hook exporta
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
    toggleAnnualDiscount //9.5.2
  } = useBudget() //O hook useBudget gerencia todo o estado da aplicação

  const originalTotal = calculateTotal(selectedIds, websitePages, websiteLanguages, false) //9.5.3 calcular total sem desconto

  // 2 - Retorna JSX da página
  return (
    <div className="container">
      <header className="calc-header">
        <h1>Orçamento de Serviços</h1>
        <Link to="/" className="btn btn-secondary">
          Voltar para a tela inicial
        </Link>
      </header>

      <div className="services">  
        {/* 2.1 - Mapeia cada serviço para checkbox */}
        {SERVICES.map(service => (
          <ServiceCheckbox
            key={service.id}
            id={service.id}
            label={service.label}
            price={service.price}
            checked={selectedIds.includes(service.id)} // Verifica se serviço está selecionado
            onChange={toggleService} // Função para alternar o estado do serviço
          />
        ))}
      </div>

      {/* 2.2 - Renderiza WebsiteOptions se website selecionado */}
      {selectedIds.includes('website') && (
        <WebsiteOptions
          pages={websitePages}
          languages={websiteLanguages}
          onPagesChange={setWebsitePages}
          onLanguagesChange={setWebsiteLanguages}
        />
      )}

      {/* 9.5.4 - Toggle de desconto anual */}
      <AnnualDiscountToggle
        isChecked={isAnnualDiscount}
        onChange={toggleAnnualDiscount}
        discount={20}
      />

      {/* 2.3 - Exibe total calculado com desconto aplicado */}
      <Total 
        amount={total} 
        originalAmount={isAnnualDiscount ? originalTotal : undefined}
        isAnnualDiscount={isAnnualDiscount}
      />

      {/* 2.4 - Renderiza formulário para novo orçamento */}
      <QuoteForm 
      onSubmit={addBudget} 
      isAnnualDiscount={isAnnualDiscount} //9.6.2 passa o estado de desconto anual
      />

      {/* 2.5 - Renderiza lista de orçamentos */}
      <BudgetsList 
      budgets={budgets} 
      />
    </div>
  )
}