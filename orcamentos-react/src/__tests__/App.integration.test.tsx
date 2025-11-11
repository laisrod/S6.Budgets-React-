import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import '@testing-library/jest-dom';

describe('App integration', () => {
  test('renders services and toggles website options', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Services rendered
    expect(screen.getByText(/Orçamento de Serviços/i)).toBeInTheDocument()
    const websiteCheckbox = screen.getByRole('checkbox', { name: /Criar um site/i })
    expect(websiteCheckbox).toBeInTheDocument()

    expect(screen.queryByText(/Opções do Website/i)).not.toBeInTheDocument()

    await user.click(websiteCheckbox)

    expect(screen.getByText(/Opções do Website/i)).toBeInTheDocument()

    const incPages = screen.getByRole('button', { name: /Aumentar número de páginas/i })
    await user.click(incPages)

    const pagesInput = screen.getByRole('spinbutton', { name: /Número de páginas/i }) as HTMLInputElement
    expect(pagesInput.value).toBe('2') // default 1 + 1 click
  })
})


