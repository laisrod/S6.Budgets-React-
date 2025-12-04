import { useState } from 'react'
import Input from '../atoms/Input'
import Label from '../atoms/Label'
import Button from '../atoms/Button'


//9.6.1
interface QuoteFormProps {
  onSubmit: (quoteName: string, clientName: string) => void
  isAnnualDiscount: boolean
}

export default function QuoteForm({ onSubmit, isAnnualDiscount }: QuoteFormProps) {
  // 1 - Estados locais do formulário
  const [quoteName, setQuoteName] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')
  const [errors, setErrors] = useState({ quoteName: '', clientName: '' })

  // 2 - Quando usuário clica em "Solicitar Orçamento"
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Não recarrega página
    
    const newErrors = { quoteName: '', clientName: '' }
    
    // Valida se campos não estão vazios
    if (!quoteName.trim()) {
      newErrors.quoteName = 'Nome da cotação é obrigatório'
    }
    
    if (!clientName.trim()) {
      newErrors.clientName = 'Nome do cliente é obrigatório'
    }
    
    setErrors(newErrors)
    
    if (quoteName.trim() && clientName.trim()) {
      // Chama função que veio de fora (do hook)
      onSubmit(quoteName.trim(), clientName.trim())
      // Limpa formulário para próximo orçamento
      setQuoteName('')
      setClientName('')
      setErrors({ quoteName: '', clientName: '' })
      // Limpa erros para próximo orçamento
    }
  }


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
        {errors.quoteName && <span className="error">{errors.quoteName}</span>}
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
        {errors.clientName && <span className="error">{errors.clientName}</span>}
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