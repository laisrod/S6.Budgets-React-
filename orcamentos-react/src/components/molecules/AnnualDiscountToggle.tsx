import Checkbox from '../atoms/Checkbox'
import Label from '../atoms/Label'
import Span from '../atoms/Span'

interface AnnualDiscountToggleProps {
    isChecked: boolean
    onChange: () => void
    discount: number
}

export default function AnnualDiscountToggleProps({
    isChecked,
    onChange,
    discount
}: AnnualDiscountToggleProps) {
    return (
        <div className="annual-discount">
            <Label htmlFor="annual-discount" className="annual-discount__label">
                <Checkbox
                id="annual-discount"
                checked={isChecked}
                onChange={onChange}
                />
                <Span>Orçamento Anual</Span>
                {isChecked && (
                    <Span className="annual-discount__badge">
                        {discount}% OFF
                    </Span>
                )}
            </Label>
            {isChecked && (
                <p className="annual-discount__message">
                    Desconto de {discount}% aplicado no orçamento anual!
                </p>
            )}
        </div>
    )
}

//9.3.1 novo componente