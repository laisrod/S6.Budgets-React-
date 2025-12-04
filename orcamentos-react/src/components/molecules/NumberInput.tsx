import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Label from '../atoms/Label'

//Input + Label + Button
interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  incrementAriaLabel: string;
  decrementAriaLabel: string;
}

export default function NumberInput({
  id,
  label,
  value,
  onIncrement,
  onDecrement,
  onChange,
  incrementAriaLabel,
  decrementAriaLabel
}: NumberInputProps) {
  return (
    <div className="form-group">
      <Label htmlFor={id}>
        {label}
      </Label>
      <div className="input-with-buttons">
        <Button
          variant="decrement"
          onClick={onDecrement}
          aria-label={decrementAriaLabel}
        >
          -
        </Button>
        <Input
          type="number"
          id={id}
          min="1"
          value={value}
          onChange={onChange}
        />
        <Button
          variant="increment"
          onClick={onIncrement}
          aria-label={incrementAriaLabel}
        >
          +
        </Button>
      </div>
    </div>
  )
}

