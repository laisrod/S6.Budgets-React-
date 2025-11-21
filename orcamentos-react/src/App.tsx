import { useState } from 'react'
import './App.css'
import { SERVICES } from './constants/services'
import ServiceCheckbox from './components/organisms/ServiceCheckbox'
import Total from './components/organisms/Total'
import WebsiteOptions from './components/organisms/WebsiteOptions'

export default function App() {

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  const [websitePages, setWebsitePages] = useState<number>(1)
  
  const [websiteLanguages, setWebsiteLanguages] = useState<number>(1)

  const toggleService = (id: string, checked: boolean): void => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      const novaLista = selectedIds.filter(serviceId => serviceId !== id)
      setSelectedIds(novaLista)
      
      if (id === 'website') {
        setWebsitePages(1)
        setWebsiteLanguages(1)
      }
    }
  }

  let servicesTotal = 0
  for (let i = 0; i < selectedIds.length; i++) {
    const serviceId = selectedIds[i]
    const service = SERVICES.find(s => s.id === serviceId)
    if (service) {
      servicesTotal = servicesTotal + service.price
    }
  }

  let websiteAdditional = 0
  if (selectedIds.includes('website')) {
    websiteAdditional = (websitePages + websiteLanguages) * 30
  }

  const total = servicesTotal + websiteAdditional

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

