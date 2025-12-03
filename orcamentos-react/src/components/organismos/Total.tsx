import Span from '../atoms/Span'
import Strong from '../atoms/Strong'

//9.4.1
interface TotalProps {
  amount: number
  originalAmount?: number
  isAnnualDiscount?: boolean
}

export default function Total({ amount, originalAmount, isAnnualDiscount }: TotalProps) {
  return (
    <div className="total">
      <div>
        <Span>Total:</Span>
        {isAnnualDiscount && originalAmount && (
          <Span className="total__original">(20% de desconto aplicado)</Span>
        )}
        
        <Strong>€ {amount}</Strong>
        {isAnnualDiscount && (
          <Span className="total__discount">(20% de desconto aplicado)</Span>
        )}
      </div>
    </div>
  )
}