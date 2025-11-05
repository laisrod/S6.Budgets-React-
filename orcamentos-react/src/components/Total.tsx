interface TotalProps {
  amount: number;
}

export default function Total({ amount }: TotalProps) {
  return (
    <div className="total">
      <span>Total:</span>
      <strong>€ {amount}</strong>
    </div>
  );
}

