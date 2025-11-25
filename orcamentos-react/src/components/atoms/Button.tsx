interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'increment' | 'decrement' | 'primary';
  'aria-label'?: string;
}

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  className = '',
  variant = 'primary',
  'aria-label': ariaLabel,
  ...props 
}: ButtonProps) {
  const baseClass = variant === 'increment' || variant === 'decrement' 
    ? 'increment-btn' 
    : 'btn'
  
  return (
    <button
      type={type}
      className={`${baseClass} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  )
}

