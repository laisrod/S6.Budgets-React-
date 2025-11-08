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
    onPagesChange(pages + 1)
  }

  const handleDecrementPages = () => {
    if (pages > 1) {
      onPagesChange(pages - 1)
    }
  }

  const handleIncrementLanguages = () => {
    onLanguagesChange(languages + 1)
  }

  const handleDecrementLanguages = () => {
    if (languages > 1) {
      onLanguagesChange(languages - 1)
    }
  }

  return (
    <div className="website-options">
      <h3>Opções do Website</h3>
      <div className="website-form">
        <div className="form-group">
          <label htmlFor="pages">
            Número de páginas:
          </label>
          <div className="input-with-buttons">
            <button 
              type="button" 
              className="increment-btn" 
              onClick={handleDecrementPages}
              aria-label="Diminuir número de páginas"
            >
              -
            </button>
            <input
              type="number"
              id="pages"
              min="1"
              value={pages}
              onChange={(e) => onPagesChange(Number(e.target.value) || 1)}
            />
            <button 
              type="button" 
              className="increment-btn" 
              onClick={handleIncrementPages}
              aria-label="Aumentar número de páginas"
            >
              +
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="languages">
            Número de idiomas:
          </label>
          <div className="input-with-buttons">
            <button 
              type="button" 
              className="increment-btn" 
              onClick={handleDecrementLanguages}
              aria-label="Diminuir número de idiomas"
            >
              -
            </button>
            <input
              type="number"
              id="languages"
              min="1"
              value={languages}
              onChange={(e) => onLanguagesChange(Number(e.target.value) || 1)}
            />
            <button 
              type="button" 
              className="increment-btn" 
              onClick={handleIncrementLanguages}
              aria-label="Aumentar número de idiomas"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="website-cost">
        <span>Custo adicional do website: €{websiteCost}</span>
      </div>
    </div>
  );
}
