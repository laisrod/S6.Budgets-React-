import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Span from './atoms/Span';
import Button from './atoms/Button';
import PriceDisplay from './molecules/PriceDisplay';
import CheckboxField from './molecules/CheckboxField';
import ServiceCheckbox from './organismos/ServiceCheckbox';


describe('Span - Renderizar Texto', () => {
  test('mostra o texto na tela', () => {
    render(<Span>Olá!</Span>);

    expect(screen.getByText('Olá!')).toBeInTheDocument();
  });
});

describe('Button - Clique Funciona', () => {
  test('mostra o texto do botão', () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });
});

describe('PriceDisplay - Mostra Preço', () => {
  test('mostra o preço formatado', () => {
    render(<PriceDisplay price={300} />);

    expect(screen.getByText('€ 300')).toBeInTheDocument();
  });

  test('mostra outro preço', () => {
    render(<PriceDisplay price={500} />);

    expect(screen.getByText('€ 500')).toBeInTheDocument();
  });
});

describe('CheckboxField - Marcar e Desmarcar', () => {
  test('mostra o texto do checkbox', () => {
    render(
      <CheckboxField
        id="teste"
        label="Aceito"
        checked={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Aceito')).toBeInTheDocument();
  });

  test('está marcado quando checked é true', () => {
    render(
      <CheckboxField
        id="teste"
        label="Opção"
        checked={true}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('está desmarcado quando checked é false', () => {
    render(
      <CheckboxField
        id="teste"
        label="Opção"
        checked={false}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('chama função quando clica', async () => {
    const funcao = vi.fn();
    const user = userEvent.setup();
    render(
      <CheckboxField
        id="teste"
        label="Clique"
        checked={false}
        onChange={funcao}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(funcao).toHaveBeenCalledTimes(1);
  });
});

describe('ServiceCheckbox - Checkbox com Preço', () => {
  test('mostra label e preço juntos', () => {
    render(
      <ServiceCheckbox
        id="seo"
        label="SEO"
        price={300}
        checked={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByText('SEO')).toBeInTheDocument();
    expect(screen.getByText('€ 300')).toBeInTheDocument();
  });

  test('está marcado quando checked é true', () => {
    render(
      <ServiceCheckbox
        id="website"
        label="Website"
        price={500}
        checked={true}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
