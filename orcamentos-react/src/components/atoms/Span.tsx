interface SpanProps {
  children: React.ReactNode;
  className?: string;
}

export default function Span({ children, className = '' }: SpanProps) {
  return (
    <span className={className}>
      {children}
    </span>
  )
}

