interface ServiceCheckboxProps {
  id: string;
  label: string;
  price: number;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export default function ServiceCheckbox({ id, label, price, checked, onChange }: ServiceCheckboxProps) {
  return (
    <label className="service-option">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
      />
      <span className="service-label">{label}</span>
      <span className="service-price">€ {price}</span>
    </label>
  );
}

