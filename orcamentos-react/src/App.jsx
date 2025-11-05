import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { SERVICES } from './constants/services'
import ServiceCheckbox from './components/ServiceCheckbox'
import Total from './components/Total'

function App() {
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const raw = localStorage.getItem('selectedServices')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  function handleToggle(serviceId, isChecked) {
    setSelectedIds((prev) => {
      if (isChecked) {
        return [...prev, serviceId]
      }
      return prev.filter((id) => id !== serviceId)
    })
  }

  const total = useMemo(() => {
    return SERVICES.filter((s) => selectedIds.includes(s.id)).reduce((sum, s) => sum + s.price, 0)
  }, [selectedIds])

  useEffect(() => {
    try {
      localStorage.setItem('selectedServices', JSON.stringify(selectedIds))
    } catch {
      // ignore persistence errors
    }
  }, [selectedIds])

  return (
    <div className="container">
      <h1>Orçamento de Serviços</h1>
      <div className="services">
        {SERVICES.map((service) => (
          <ServiceCheckbox
            key={service.id}
            id={service.id}
            label={service.label}
            price={service.price}
            checked={selectedIds.includes(service.id)}
            onChange={handleToggle}
          />)
        )}
      </div>
      <Total amount={total} />
    </div>
  )
}

export default App
