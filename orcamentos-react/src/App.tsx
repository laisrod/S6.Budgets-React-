import { useEffect, useState } from 'react'
import './App.css'
import { SERVICES } from './constants/services'
import ServiceCheckbox from './components/ServiceCheckbox'
import Total from './components/Total'
import WebsiteOptions from './components/WebsiteOptions'

export default function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    () => {
      try {
        const raw = localStorage.getItem('selectedServices')
        return raw ? JSON.parse(raw) : []
      } catch {
        return []
      }
    }
  )

  const toggleService = (id: string, checked: boolean): void => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id))
  }

  const [websitePages, setWebsitePages] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('websitePages')
      return raw ? Number(JSON.parse(raw)) : 1
    } catch {
      return 1
    }
  })

  const [websiteLanguages, setWebsiteLanguages] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('websiteLanguages')
      return raw ? Number(JSON.parse(raw)) : 1
    } catch {
      return 1
    }
  })

  const [total, setTotal] = useState<number>(0)

  const websiteAdditionalCost = (websitePages + websiteLanguages) * 30
  const isWebsiteSelected = selectedIds.includes('website')

  const handleWebsiteToggle = (id: string, checked: boolean) => {
    toggleService(id, checked)
    if (!checked && id === 'website') {
      setWebsitePages(1)
      setWebsiteLanguages(1)
    }
  }

  useEffect(() => {
    const servicesTotal = selectedIds.reduce((sum, id) => {
      const service = SERVICES.find(s => s.id === id)
      return sum + (service?.price || 0)
    }, 0)
    
    const calculatedTotal = servicesTotal + (isWebsiteSelected ? websiteAdditionalCost : 0)
    
    setTotal(calculatedTotal)
    localStorage.setItem('selectedServices', JSON.stringify(selectedIds))
    localStorage.setItem('websitePages', JSON.stringify(websitePages))
    localStorage.setItem('websiteLanguages', JSON.stringify(websiteLanguages))
  }, [selectedIds, websitePages, websiteLanguages, websiteAdditionalCost])

  return (
    <div className="container">
      <h1>Orçamento de Serviços</h1>
      <div className="services">
        {SERVICES.map(service => (
          <ServiceCheckbox
            key={service.id}
            {...service}
            checked={selectedIds.includes(service.id)}
            onChange={service.id === 'website' ? handleWebsiteToggle : toggleService}
          />
        ))}
      </div>
      {isWebsiteSelected && (
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

