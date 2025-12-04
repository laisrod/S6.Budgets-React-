import CheckboxField from '../molecules/CheckboxField'
import PriceDisplay from '../molecules/PriceDisplay'

interface ServiceCheckboxProps {
  id: string;
  label: string;
  price: number;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

//CheckboxField + PriceDisplay
export default function ServiceCheckbox({ id, label, price, checked, onChange }: ServiceCheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const estaMarcado = event.target.checked
    onChange(id, estaMarcado)
  }

  return (
    <CheckboxField
      id={id}
      label={label}
      checked={checked}
      onChange={handleChange}
    >
      <PriceDisplay price={price} />
    </CheckboxField>
  )
}

