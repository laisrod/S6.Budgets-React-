import { render, screen, fireEvent } from '@testing-library/react'
import WebsiteOptions from '../WebsiteOptions'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

describe('WebsiteOptions', () => {
  test('mostra a seção e os campos básicos', () => {
    render(
      <WebsiteOptions
        pages={1}
        languages={1}
        onPagesChange={vi.fn()}
        onLanguagesChange={vi.fn()}
      />
    )
    expect(screen.getByText(/Opções do Website/i)).toBeInTheDocument()
    expect(screen.getByText(/Número de páginas/i)).toBeInTheDocument()
    expect(screen.getByText(/Número de idiomas/i)).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /Número de páginas/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /Número de idiomas/i })).toBeInTheDocument()
  })

  test('páginas: clicar em + chama o callback com +1', () => {
    const aoMudarPaginas = vi.fn()
    render(<WebsiteOptions pages={2} languages={1} onPagesChange={aoMudarPaginas} onLanguagesChange={vi.fn()} />)

    const botaoMais = screen.getByRole('button', { name: /Aumentar número de páginas/i })
    fireEvent.click(botaoMais)

    expect(aoMudarPaginas).toHaveBeenCalledWith(3)
  })

  test('páginas: com valor 1, clicar em - não chama callback', () => {
    const aoMudarPaginas = vi.fn()
    render(<WebsiteOptions pages={1} languages={1} onPagesChange={aoMudarPaginas} onLanguagesChange={vi.fn()} />)

    const botaoMenos = screen.getByRole('button', { name: /Diminuir número de páginas/i })
    fireEvent.click(botaoMenos)

    expect(aoMudarPaginas).not.toHaveBeenCalled()
  })

  test('idiomas: digitar um número chama o callback com esse número', () => {
    const aoMudarIdiomas = vi.fn()
    render(<WebsiteOptions pages={1} languages={5} onPagesChange={vi.fn()} onLanguagesChange={aoMudarIdiomas} />)

    const campoIdiomas = screen.getByRole('spinbutton', { name: /Número de idiomas/i }) as HTMLInputElement
    fireEvent.change(campoIdiomas, { target: { value: '7' } })

    expect(aoMudarIdiomas).toHaveBeenCalledWith(7)
  })

  test('idiomas: valor inválido vira 1 (mínimo)', () => {
    const aoMudarIdiomas = vi.fn()
    render(<WebsiteOptions pages={1} languages={5} onPagesChange={vi.fn()} onLanguagesChange={aoMudarIdiomas} />)

    const campoIdiomas = screen.getByRole('spinbutton', { name: /Número de idiomas/i }) as HTMLInputElement
    fireEvent.change(campoIdiomas, { target: { value: 'abc' } })

    expect(aoMudarIdiomas).toHaveBeenCalledWith(1)
  })
})
