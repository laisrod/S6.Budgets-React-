interface StrongProps {
  children: React.ReactNode;
  className?: string;
}

export default function Strong({ children, className = '' }: StrongProps) {
  return (
    <strong className={className}>
      {children}
    </strong>
  )
}

