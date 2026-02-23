# 📘 Tipagem de Componentes React com TypeScript
## Guia Completo para Iniciantes

Este documento explica como os componentes React são tipados com TypeScript nesta aplicação.

---

## 📋 Índice

1. [Conceitos Básicos](#1-conceitos-básicos)
2. [Estrutura de Tipagem](#2-estrutura-de-tipagem)
3. [Tipando Props](#3-tipando-props)
4. [Tipando Eventos](#4-tipando-eventos)
5. [Tipando Funções como Props](#5-tipando-funções-como-props)
6. [Tipos Opcionais](#6-tipos-opcionais)
7. [Exemplos Práticos](#7-exemplos-práticos)
8. [Componentes que usam useBudget](#8-componentes-que-usam-usebudget)

---

## 1. Conceitos Básicos

### O que é tipagem?

**Tipagem** é dizer ao TypeScript **que tipo de dados** uma variável, função ou componente pode receber ou retornar.

**Exemplo sem tipagem (JavaScript):**
```javascript
function somar(a, b) {
  return a + b
}
// Pode receber qualquer coisa: somar("1", "2") ou somar(1, 2)
```

**Exemplo com tipagem (TypeScript):**
```typescript
function somar(a: number, b: number): number {
  return a + b
}
// Só aceita números: somar(1, 2) ✅ | somar("1", "2") ❌
```

### Por que tipar componentes?

1. **Previne erros**: TypeScript avisa se você passar dados errados
2. **Autocompletar**: IDE sugere propriedades disponíveis
3. **Documentação**: Código fica auto-documentado
4. **Refatoração segura**: Mudanças são detectadas automaticamente

---

## 2. Estrutura de Tipagem

### Padrão usado na aplicação:

```typescript
// 1. Define a interface das props
interface NomeDoComponenteProps {
  // propriedades aqui
}

// 2. Define o componente com tipagem
export default function NomeDoComponente({ prop1, prop2 }: NomeDoComponenteProps) {
  // código do componente
}
```

**Exemplo real:**

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, onClick, type = 'button' }: ButtonProps) {
  return <button type={type} onClick={onClick}>{children}</button>
}
```

---

## 3. Tipando Props

### 3.1. Props Simples

**Tipos básicos:**
- `string`: Texto
- `number`: Número
- `boolean`: Verdadeiro/Falso
- `string[]`: Array de strings
- `number[]`: Array de números

**Exemplo:**

```typescript
interface TotalProps {
  amount: number           // número obrigatório
  originalAmount?: number  // número opcional
  isAnnualDiscount?: boolean  // boolean opcional
}

export default function Total({ amount, originalAmount, isAnnualDiscount }: TotalProps) {
  return <div>Total: €{amount}</div>
}
```

### 3.2. Props com Valores Específicos (Union Types)

Quando uma prop só pode ter valores específicos:

```typescript
interface ButtonProps {
  variant?: 'increment' | 'decrement' | 'primary'
  type?: 'button' | 'submit' | 'reset'
}
```

**Explicação:**
- `variant` só pode ser: `'increment'`, `'decrement'` ou `'primary'`
- `type` só pode ser: `'button'`, `'submit'` ou `'reset'`
- Qualquer outro valor dá erro!

**Uso:**
```typescript
<Button variant="primary" /> ✅
<Button variant="secondary" /> ❌ // Erro! Não existe
```

### 3.3. Props com React.ReactNode

Para aceitar qualquer conteúdo React (texto, elementos, componentes):

```typescript
interface ButtonProps {
  children: React.ReactNode
}
```

**Explicação:**
- `React.ReactNode` aceita: strings, números, elementos JSX, arrays, etc.

**Uso:**
```typescript
<Button>Clique aqui</Button> ✅
<Button><span>Texto</span></Button> ✅
<Button>{123}</Button> ✅
```

---

## 4. Tipando Eventos

### 4.1. Eventos de Input

Quando você precisa tipar eventos de formulários:

```typescript
interface InputProps {
  value: string | number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
```

**Explicação:**
- `React.ChangeEvent<HTMLInputElement>`: Tipo do evento de mudança em input
- `HTMLInputElement`: Tipo do elemento HTML (input)

**Exemplo de uso:**

```typescript
export default function Input({ value, onChange }: InputProps) {
  return (
    <input 
      value={value}
      onChange={(e) => {
        // e é do tipo React.ChangeEvent<HTMLInputElement>
        onChange?.(e)  // ?. = só chama se existir
      }}
    />
  )
}
```

### 4.2. Eventos de Formulário

Para eventos de submit:

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()  // Previne recarregar página
  // ... resto do código
}
```

**Explicação:**
- `React.FormEvent<HTMLFormElement>`: Tipo do evento de submit
- `HTMLFormElement`: Tipo do elemento HTML (form)

**Exemplo completo:**

```typescript
export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit('Nome', 'Cliente')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}
```

### 4.3. Eventos de Click

Para botões e elementos clicáveis:

```typescript
interface ButtonProps {
  onClick?: () => void  // Função sem parâmetros
}
```

**Ou se precisar do evento:**

```typescript
interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
```

---

## 5. Tipando Funções como Props

### 5.1. Funções Simples

Quando você passa uma função como prop:

```typescript
interface ServiceCheckboxProps {
  onChange: (id: string, checked: boolean) => void
}
```

**Explicação:**
- `onChange`: É uma função
- Recebe: `id` (string) e `checked` (boolean)
- Retorna: `void` (nada)

**Uso:**

```typescript
// No componente pai (Calculator.tsx)
const toggleService = (id: string, checked: boolean) => {
  // ... lógica
}

// Passando para o componente filho
<ServiceCheckbox 
  onChange={toggleService}  // Passa a função
/>
```

### 5.2. Funções com Tipos Específicos

Quando a função precisa de tipos específicos:

```typescript
interface WebsiteOptionsProps {
  onPagesChange: (pages: number) => void
  onLanguagesChange: (languages: number) => void
}
```

**Explicação:**
- `onPagesChange`: Função que recebe número e não retorna nada
- `onLanguagesChange`: Função que recebe número e não retorna nada

**Uso:**

```typescript
// No componente pai
const setWebsitePages = (pages: number) => {
  // ... lógica
}

// Passando para o componente filho
<WebsiteOptions 
  onPagesChange={setWebsitePages}
/>
```

### 5.3. Funções de Callback Complexas

Para funções que recebem outras funções:

```typescript
interface QuoteFormProps {
  onSubmit: (quoteName: string, clientName: string) => void
}
```

**Explicação:**
- `onSubmit`: Função que recebe 2 strings e não retorna nada

**Uso:**

```typescript
// No componente filho (QuoteForm.tsx)
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  onSubmit(quoteName, clientName)  // Chama a função passada como prop
}

// No componente pai (Calculator.tsx)
const addBudget = (quoteName: string, clientName: string) => {
  // ... salva orçamento
}

<QuoteForm onSubmit={addBudget} />
```

---

## 6. Tipos Opcionais

### 6.1. Propriedades Opcionais

Use `?` para tornar uma propriedade opcional:

```typescript
interface TotalProps {
  amount: number           // Obrigatório
  originalAmount?: number  // Opcional (pode não existir)
  isAnnualDiscount?: boolean  // Opcional
}
```

**Explicação:**
- `amount`: Sempre precisa ser passado
- `originalAmount`: Pode ser passado ou não
- `isAnnualDiscount`: Pode ser passado ou não

**Uso:**

```typescript
<Total amount={100} /> ✅
<Total amount={100} originalAmount={120} /> ✅
<Total amount={100} isAnnualDiscount={true} /> ✅
```

### 6.2. Valores Padrão

Combine tipos opcionais com valores padrão:

```typescript
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({ 
  type = 'button',      // Valor padrão se não for passado
  className = ''        // Valor padrão se não for passado
}: ButtonProps) {
  return <button type={type} className={className}>Click</button>
}
```

**Uso:**

```typescript
<Button />  // type será 'button', className será ''
<Button type="submit" />  // type será 'submit', className será ''
```

---

## 7. Exemplos Práticos

### Exemplo 1: Componente Simples (Total.tsx)

```typescript
interface TotalProps {
  amount: number           // Obrigatório: valor total
  originalAmount?: number  // Opcional: valor antes do desconto
  isAnnualDiscount?: boolean  // Opcional: se tem desconto
}

export default function Total({ 
  amount, 
  originalAmount, 
  isAnnualDiscount 
}: TotalProps) {
  return (
    <div className="total">
      <span>Total: €{amount}</span>
      {isAnnualDiscount && originalAmount && (
        <span>Valor original: €{originalAmount}</span>
      )}
    </div>
  )
}
```

**Como é usado:**

```typescript
// No Calculator.tsx
const { total, isAnnualDiscount } = useBudget()

<Total 
  amount={total} 
  originalAmount={isAnnualDiscount ? total : undefined}
  isAnnualDiscount={isAnnualDiscount}
/>
```

### Exemplo 2: Componente com Eventos (ServiceCheckbox.tsx)

```typescript
interface ServiceCheckboxProps {
  id: string
  label: string
  price: number
  checked: boolean
  onChange: (id: string, checked: boolean) => void
}

export default function ServiceCheckbox({ 
  id, 
  label, 
  price, 
  checked, 
  onChange 
}: ServiceCheckboxProps) {
  // Tipando o evento do input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const estaMarcado = event.target.checked
    onChange(id, estaMarcado)  // Chama a função passada como prop
  }

  return (
    <div>
      <input 
        type="checkbox"
        checked={checked}
        onChange={handleChange}  // Evento tipado
      />
      <label>{label} - €{price}</label>
    </div>
  )
}
```

**Como é usado:**

```typescript
// No Calculator.tsx
const { selectedIds, toggleService } = useBudget()

<ServiceCheckbox
  id="seo"
  label="SEO"
  price={300}
  checked={selectedIds.includes('seo')}
  onChange={toggleService}  // Função do useBudget
/>
```

### Exemplo 3: Componente com Formulário (QuoteForm.tsx)

```typescript
interface QuoteFormProps {
  onSubmit: (quoteName: string, clientName: string) => void
  isAnnualDiscount: boolean
}

export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  // Tipando estado com useState
  const [quoteName, setQuoteName] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')

  // Tipando evento de submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (quoteName.trim() && clientName.trim()) {
      onSubmit(quoteName.trim(), clientName.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={quoteName}
        onChange={(e) => setQuoteName(e.target.value)}
      />
      <input 
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <button type="submit">Salvar</button>
    </form>
  )
}
```

**Como é usado:**

```typescript
// No Calculator.tsx
const { addBudget } = useBudget()

<QuoteForm 
  onSubmit={addBudget}  // Função do useBudget
  isAnnualDiscount={isAnnualDiscount}
/>
```

---

## 8. Componentes que usam useBudget

### 8.1. Calculator.tsx (Componente Pai)

**Este componente NÃO recebe props**, mas **usa o hook useBudget**:

```typescript
export default function Calculator() {
  // Desestrutura o retorno do useBudget
  const {
    selectedIds,           // string[]
    websitePages,         // number
    websiteLanguages,     // number
    toggleService,        // (id: string, checked: boolean) => void
    setWebsitePages,      // (pages: number) => void
    setWebsiteLanguages,  // (languages: number) => void
    total,                // number
    budgets,              // Budget[]
    addBudget,            // (quoteName: string, clientName: string) => void
    isAnnualDiscount,     // boolean
    toggleAnnualDiscount  // () => void
  } = useBudget()

  return (
    <div>
      {/* Passa dados e funções para componentes filhos */}
      <ServiceCheckbox
        checked={selectedIds.includes('seo')}
        onChange={toggleService}
      />
      
      <WebsiteOptions
        pages={websitePages}
        languages={websiteLanguages}
        onPagesChange={setWebsitePages}
        onLanguagesChange={setWebsiteLanguages}
      />
      
      <Total amount={total} />
      
      <QuoteForm onSubmit={addBudget} />
    </div>
  )
}
```

**Observações importantes:**
- `Calculator` não tem props (não precisa de interface)
- Usa `useBudget()` para obter dados e funções
- Passa essas funções como props para componentes filhos

### 8.2. ServiceCheckbox.tsx

**Recebe funções do useBudget como props:**

```typescript
interface ServiceCheckboxProps {
  id: string
  label: string
  price: number
  checked: boolean  // Vem de selectedIds.includes(id)
  onChange: (id: string, checked: boolean) => void  // É toggleService do useBudget
}

export default function ServiceCheckbox({ 
  id, 
  label, 
  price, 
  checked, 
  onChange 
}: ServiceCheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked)  // Chama toggleService
  }

  return (
    <input 
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  )
}
```

**Fluxo:**
1. `Calculator` chama `useBudget()` → obtém `toggleService`
2. `Calculator` passa `toggleService` como prop `onChange` para `ServiceCheckbox`
3. Usuário clica no checkbox
4. `ServiceCheckbox` chama `onChange(id, checked)` → que é `toggleService`
5. `toggleService` atualiza a URL e o estado
6. React re-renderiza tudo automaticamente

### 8.3. WebsiteOptions.tsx

**Recebe valores e funções do useBudget:**

```typescript
interface WebsiteOptionsProps {
  pages: number  // Vem de websitePages do useBudget
  languages: number  // Vem de websiteLanguages do useBudget
  onPagesChange: (pages: number) => void  // É setWebsitePages do useBudget
  onLanguagesChange: (languages: number) => void  // É setWebsiteLanguages do useBudget
}

export default function WebsiteOptions({ 
  pages, 
  languages, 
  onPagesChange, 
  onLanguagesChange 
}: WebsiteOptionsProps) {
  return (
    <div>
      <NumberInput
        value={pages}
        onChange={onPagesChange}  // Chama setWebsitePages
      />
      <NumberInput
        value={languages}
        onChange={onLanguagesChange}  // Chama setWebsiteLanguages
      />
    </div>
  )
}
```

### 8.4. QuoteForm.tsx

**Recebe função do useBudget para salvar:**

```typescript
interface QuoteFormProps {
  onSubmit: (quoteName: string, clientName: string) => void  // É addBudget do useBudget
  isAnnualDiscount: boolean  // Vem do useBudget
}

export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [quoteName, setQuoteName] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(quoteName, clientName)  // Chama addBudget
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}
```

**Fluxo:**
1. Usuário preenche formulário e clica "Salvar"
2. `QuoteForm` chama `onSubmit(quoteName, clientName)` → que é `addBudget`
3. `addBudget` cria objeto Budget e salva usando `setBudgetsRaw`
4. `useLocalStorage` detecta mudança e salva no localStorage
5. React re-renderiza e mostra novo orçamento na lista

---

## 🎓 Resumo dos Padrões de Tipagem

### 1. Interface de Props
```typescript
interface ComponenteProps {
  propObrigatoria: string
  propOpcional?: number
  funcao: (param: string) => void
}
```

### 2. Componente Funcional Tipado
```typescript
export default function Componente({ 
  propObrigatoria, 
  propOpcional = valorPadrao 
}: ComponenteProps) {
  // código
}
```

### 3. Eventos Tipados
```typescript
// Input
onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}

// Form
onSubmit={(e: React.FormEvent<HTMLFormElement>) => {}}

// Button
onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}}
```

### 4. Funções como Props
```typescript
// Função simples
onClick: () => void

// Função com parâmetros
onChange: (id: string, checked: boolean) => void

// Função com retorno
calculate: (a: number, b: number) => number
```

### 5. Tipos Opcionais
```typescript
interface Props {
  obrigatorio: string
  opcional?: number  // ? torna opcional
}
```

---

## ✅ Checklist de Boas Práticas

- [ ] Sempre criar interface para props: `ComponenteProps`
- [ ] Tipar todos os parâmetros de funções
- [ ] Tipar eventos do React: `React.ChangeEvent<HTMLInputElement>`
- [ ] Usar `?` para props opcionais
- [ ] Definir valores padrão quando apropriado
- [ ] Usar tipos específicos quando possível (`'button' | 'submit'`)
- [ ] Documentar props complexas com comentários

---

## 🔍 Dicas Importantes

1. **TypeScript infere tipos**: Se você não tipar, TypeScript tenta adivinhar
2. **Erros são úteis**: Erros do TypeScript ajudam a encontrar bugs antes de executar
3. **Autocompletar**: Com tipos, o IDE sugere propriedades disponíveis
4. **Refatoração segura**: Mudanças são detectadas automaticamente
5. **Documentação viva**: Tipos servem como documentação do código

---

**Lembre-se:** A tipagem não é apenas para o TypeScript, é para **você** entender melhor o código e prevenir erros! 🎯

