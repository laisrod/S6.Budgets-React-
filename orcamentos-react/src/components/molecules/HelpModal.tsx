import { useEffect } from 'react'
import Button from '../atoms/Button'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function HelpModal({ isOpen, onClose, title, children }: HelpModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <Button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Fechar modal"
          >
            ×
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Button onClick={onClose} variant="primary">
            Entendi
          </Button>
        </div>
      </div>
    </div>
  )
}