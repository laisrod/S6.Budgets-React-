import Span from '../atoms/Span'
import Strong from '../atoms/Strong'

interface TotalProps {
  amount: number;
}

export default function Total({ amount }: TotalProps) {
  return (
    <div className="total">
      <Span>Total:</Span>
      <Strong>€ {amount}</Strong>
    </div>
  );
}

