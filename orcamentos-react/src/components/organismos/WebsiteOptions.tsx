import NumberInput from '../molecules/NumberInput'
import Span from '../atoms/Span'

interface WebsiteOptionsProps {
  pages: number;
  languages: number;
  onPagesChange: (pages: number) => void;
  onLanguagesChange: (languages: number) => void;
}

export default function WebsiteOptions({ 
  pages, 
  languages, 
  onPagesChange, 
  onLanguagesChange 
}: WebsiteOptionsProps) {
  const websiteCost = (pages + languages) * 30

  const handleIncrementPages = () => {
    const novoValor = pages + 1
    onPagesChange(novoValor)
  }

  const handleDecrementPages = () => {
    if (pages > 1) {
      const novoValor = pages - 1
      onPagesChange(novoValor)
    }
  }

  const handleIncrementLanguages = () => {
    const novoValor = languages + 1
    onLanguagesChange(novoValor)
  }

  const handleDecrementLanguages = () => {
    if (languages > 1) {
      const novoValor = languages - 1
      onLanguagesChange(novoValor)
    }
  }

  const handlePagesInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = event.target.value
    const valorNumerico = Number(valorDigitado)
    
    if (valorNumerico >= 1) {
      onPagesChange(valorNumerico)
    } else {
      onPagesChange(1)
    }
  }

  const handleLanguagesInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = event.target.value
    const valorNumerico = Number(valorDigitado)
    
    if (valorNumerico >= 1) {
      onLanguagesChange(valorNumerico)
    } else {
      onLanguagesChange(1)
    }
  }

  return (
    <div className="website-options">
      <h3>Opções do Website</h3>
      <div className="website-form">
        <NumberInput
          id="pages"
          label="Número de páginas:"
          value={pages}
          onIncrement={handleIncrementPages}
          onDecrement={handleDecrementPages}
          onChange={handlePagesInputChange}
          incrementAriaLabel="Aumentar número de páginas"
          decrementAriaLabel="Diminuir número de páginas"
        />
        <NumberInput
          id="languages"
          label="Número de idiomas:"
          value={languages}
          onIncrement={handleIncrementLanguages}
          onDecrement={handleDecrementLanguages}
          onChange={handleLanguagesInputChange}
          incrementAriaLabel="Aumentar número de idiomas"
          decrementAriaLabel="Diminuir número de idiomas"
        />
      </div>
      <div className="website-cost">
        <Span>Custo adicional do website: €{websiteCost}</Span>
      </div>
    </div>
  );
}

