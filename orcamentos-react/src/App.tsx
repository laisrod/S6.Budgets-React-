import './App.css'
import { SERVICES } from './constants/services'
import ServiceCheckbox from './components/organisms/ServiceCheckbox'
import Total from './components/organisms/Total'
import WebsiteOptions from './components/organisms/WebsiteOptions'
import { useBudget } from './hooks/useBudget'

export default function App() {
  const {
    selectedIds,
    websitePages,
    websiteLanguages,
    toggleService,
    setWebsitePages,
    setWebsiteLanguages,
    total
  } = useBudget()

  return (
    <div className="container">
      <h1>Orçamento de Serviços</h1>
      
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
      
      <Total amount={total} />
    </div>
  )
}

