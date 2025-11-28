import { useState } from 'react'
import Input from '../atoms/Input'
import Label from '../atoms/Label'
import Button from '../atoms/Button'

interface QuoteFormProps {
  onSubmit: (quoteName: string, clientName: string) => void
}

export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [quoteName, setQuoteName] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (quoteName.trim() && clientName.trim()) {
      onSubmit(quoteName.trim(), clientName.trim())
      setQuoteName('')
      setClientName('')
    }
  }

  const isFormValid = quoteName.trim() !== '' && clientName.trim() !== ''

  return (
    <form onSubmit={handleSubmit} className="quote-form">
      <h3>Solicitar Orçamento</h3>
      
      <div className="form-group">
        <Label htmlFor="quoteName">Nome da cotação:</Label>
        <Input
          type="text"
          id="quoteName"
          value={quoteName}
          onChange={(e) => setQuoteName(e.target.value)}
          placeholder="Ex: Orçamento Site Empresa"
        />
      </div>

      <div className="form-group">
        <Label htmlFor="clientName">Nome do cliente:</Label>
        <Input
          type="text"
          id="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Ex: João Silva"
        />
      </div>

      <Button 
        type="submit" 
        variant="primary"
        aria-label="Solicitar Orçamento"
      >
        Solicitar Orçamento
      </Button>
    </form>
  )
}