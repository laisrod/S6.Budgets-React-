import { useMemo } from 'react'
import './App.css'
import { SERVICES } from './constants/services'
import ServiceCheckbox from './components/ServiceCheckbox'
import Total from './components/Total'
import WebsiteOptions from './components/WebsiteOptions'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [selectedIds, setSelectedIds] = useLocalStorage<string[]>('selectedServices', [])
  const [websitePages, setWebsitePages] = useLocalStorage<number>('websitePages', 1)
  const [websiteLanguages, setWebsiteLanguages] = useLocalStorage<number>('websiteLanguages', 1)

  const toggleService = (id: string, checked: boolean): void => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id))
    if (!checked && id === 'website') {
      setWebsitePages(1)
      setWebsiteLanguages(1)
    }
  }

  const servicesTotal = useMemo(() => {
    return selectedIds.reduce((sum, id) => {
      const service = SERVICES.find(s => s.id === id)
      return sum + (service?.price || 0)
    }, 0)
  }, [selectedIds])

  const websiteAdditional = useMemo(() => {
    return selectedIds.includes('website') ? (websitePages + websiteLanguages) * 30 : 0
  }, [selectedIds, websitePages, websiteLanguages])

  const total = servicesTotal + websiteAdditional

  return (
    <div className="container">
      <h1>Orçamento de Serviços</h1>
      <div className="services">
        {SERVICES.map(service => (
          <ServiceCheckbox
            key={service.id}
            {...service}
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

