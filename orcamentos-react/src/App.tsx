import { useEffect, useState } from 'react'
import './App.css'
import { SERVICES } from './constants/services'
import ServiceCheckbox from './components/ServiceCheckbox'
import Total from './components/Total'

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

  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const calculatedTotal = selectedIds.reduce((sum, id) => {
      const service = SERVICES.find(s => s.id === id)
      return sum + (service?.price || 0)
    }, 0)
    setTotal(calculatedTotal)
    localStorage.setItem('selectedServices', JSON.stringify(selectedIds))
  }, [selectedIds])

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
      <Total amount={total} />
    </div>
  )
}

