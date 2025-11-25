import Checkbox from '../atoms/Checkbox'
import Label from '../atoms/Label'
import Span from '../atoms/Span'

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export default function CheckboxField({ id, label, checked, onChange, children }: CheckboxFieldProps) {
  return (
    <Label htmlFor={id} className="service-option">
      <Checkbox
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <Span className="service-label">{label}</Span>
      {children}
    </Label>
  )
}

