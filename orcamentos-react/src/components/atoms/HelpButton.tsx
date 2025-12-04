interface HelpButtonProps {
    onClick: () => void
    ariaLabel?: string
}

export default function HelpButton({ onClick, ariaLabel = 'Abrir ajuda' }: HelpButtonProps) {
    return (
        <button
        type="button"
        onClick={onClick}
        className="help-button"
        aria-Label={ariaLabel}
        title="Clique para mais informações"
        >
            <span className="help-icon">ℹ️</span>
        </button>
    )
}