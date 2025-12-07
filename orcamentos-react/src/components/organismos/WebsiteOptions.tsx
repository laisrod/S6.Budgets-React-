import NumberInput from '../molecules/NumberInput'
import Span from '../atoms/Span'
import HelpButton from '../atoms/HelpButton'
import HelpModal from '../molecules/HelpModal'
import { useState } from 'react'


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
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)

  const createIncrement = (current: number, onChange: (v: number) => void) => 
    () => onChange(current + 1)

  const createDecrement = (current: number, onChange: (v: number) => void) => 
    () => current > 1 && onChange(current - 1)

  const createInputChange = (onChange: (v: number) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      const numericValue = Number(rawValue);
      const finalValue = numericValue >= 1 ? numericValue : 1;
      
      onChange(finalValue);
    };
  };

  const handleIncrementPages = createIncrement(pages, onPagesChange)
  const handleDecrementPages = createDecrement(pages, onPagesChange)
  const handlePagesInputChange = createInputChange(onPagesChange)

  const handleIncrementLanguages = createIncrement(languages, onLanguagesChange)
  const handleDecrementLanguages = createDecrement(languages, onLanguagesChange)
  const handleLanguagesInputChange = createInputChange(onLanguagesChange)

  const handleOpenHelp = () => {
    setIsHelpModalOpen(true)
  }

  const handleCloseHelp = () => {
    setIsHelpModalOpen(false)
  }


  return (
    <div className="website-options">

      <div className="help-label-container">
        <h3>Opções do Website</h3>
        <HelpButton onClick={handleOpenHelp} ariaLabel="Ajuda sobre opções do website" />
      </div>

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

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={handleCloseHelp}
        title="Ajuda: Páginas e Idiomas"
      >
        <div>
          <p>
            <strong>Número de Páginas:</strong>
          </p>
          <p>
            O número de páginas representa quantas páginas diferentes o seu website terá.
            Cada página é uma seção independente do site, como:
          </p>
          <ul>
            <li>Página inicial (Home)</li>
            <li>Sobre nós</li>
            <li>Contato</li>
            <li>Produtos/Serviços</li>
            <li>Blog</li>
            <li>E outras páginas que você precisar</li>
          </ul>
          <p>
            <strong>Custo:</strong> Cada página adicional custa €30.
          </p>

          <p style={{ marginTop: '1.5rem' }}>
            <strong>Número de Idiomas:</strong>
          </p>
          <p>
            O número de idiomas representa em quantos idiomas diferentes o seu website estará disponível.
            Por exemplo:
          </p>
          <ul>
            <li>Português</li>
            <li>Inglês</li>
            <li>Espanhol</li>
            <li>E outros idiomas que você precisar</li>
          </ul>
          <p>
            <strong>Custo:</strong> Cada idioma adicional custa €30.
          </p>

          <p style={{ marginTop: '1.5rem' }}>
            <strong>Fórmula de Cálculo:</strong>
          </p>
          <p>
            O custo adicional do website é calculado pela fórmula:
          </p>
          <p style={{ 
            backgroundColor: '#f0f0f0', 
            padding: '1rem', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            textAlign: 'center'
          }}>
            (Número de páginas + Número de idiomas) × €30
          </p>
        </div>
      </HelpModal>
    </div>
  );
}

