import Span from '../atoms/Span'

interface PriceDisplayProps {
  price: number;
  className?: string;
}

export default function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
  return (
    <Span className={`service-price ${className}`.trim()}>
      € {price}
    </Span>
  )
}

