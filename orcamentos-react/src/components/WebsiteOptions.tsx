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

  return (
    <div className="website-options">
      <h3>Opções do Website</h3>
      <div className="website-form">
        <div className="form-group">
          <label htmlFor="pages">
            Número de páginas:
          </label>
          <input
            type="number"
            id="pages"
            min="1"
            value={pages}
            onChange={(e) => onPagesChange(Number(e.target.value) || 1)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="languages">
            Número de idiomas:
          </label>
          <input
            type="number"
            id="languages"
            min="1"
            value={languages}
            onChange={(e) => onLanguagesChange(Number(e.target.value) || 1)}
          />
        </div>
      </div>
      <div className="website-cost">
        <span>Custo adicional do website: €{websiteCost}</span>
      </div>
    </div>
  );
}
