interface InputProps {
  type?: string;
  id?: string;
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  className?: string;
  [key: string]: any;
}

export default function Input({ 
  type = 'text',
  id,
  value,
  onChange,
  min,
  className = '',
  ...props 
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      min={min}
      className={className}
      {...props}
    />
  )
}

