# Digital Services Budget Application

A modern web application developed with **React** and **TypeScript** to create and manage budgets for digital services (SEO, Advertising, and Websites).

---

## What is this project?

This application allows users to:

- Select digital services (SEO €300, Advertising €400, Website €500)
- Configure website options (pages and languages)
- Apply annual discount (20% for budgets above €1,000)
- Calculate totals automatically
- Create and save budgets
- Share URLs with specific configurations
- View budget history

---

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher)

**Check installation:**
```bash
node --version
npm --version
```

---

## Installation

1. **Install dependencies:**
```bash
npm install
```
Downloads all necessary libraries (React, TypeScript, Vite, etc.)

2. **Start development server:**
```bash
npm run dev
```
Opens at `http://localhost:5173` and automatically updates when you save changes.

3. **Stop the server:**
Press `Ctrl + C` in the terminal

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server |
| `npm run build` | Creates optimized production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Checks for code errors |
| `npm run lint:fix` | Automatically fixes errors |
| `npm run type-check` | Checks TypeScript errors |
| `npm run test` | Runs tests |
| `npm run clean` | Removes temporary files |

---

## Project Structure

```
orcamentos-react/
├── src/
│   ├── components/
│   │   ├── atoms/          # Small components (Button, Input)
│   │   ├── molecules/      # Medium components (NumberInput)
│   │   └── organismos/     # Large components (WebsiteOptions)
│   ├── pages/              # Pages (Calculator, Welcome)
│   ├── hooks/               # Custom hooks (useBudget)
│   ├── services/           # Business functions (calculateBudget)
│   ├── config/             # Configuration (ContentService)
│   └── types/              # TypeScript types
├── public/                 # Public files
└── dist/                   # Production build (generated)
```

---

## Features

### 1. Service Selection
- SEO (€300), Advertising Campaign (€400), Website (€500)

### 2. Website Configuration
- Number of pages and languages
- Additional cost: (pages + languages) × €30

### 3. Annual Discount
- 20% discount for budgets above €1,000

### 4. Shareable URLs
Example: `?services=seo,website&pages=5&languages=2&annual=true`

---

## Technologies

- **React 19** - UI library
- **TypeScript** - Typed JavaScript
- **Vite** - Build tool
- **React Router** - Navigation
- **ESLint** - Code quality
- **Vitest** - Testing

---

## Architecture: Atomic Design

```
ATOMS (Button, Input)
    
MOLECULES (NumberInput, CheckboxField)
    
ORGANISMS (WebsiteOptions, QuoteForm)
    
PAGES (Calculator, Welcome)
```

**Advantages:** Reusable components, organized code, easy maintenance

---

## Important Concepts

### Hooks
Special React functions:
- `useState` - Stores values that can change
- `useEffect` - Executes code when something changes
- `useMemo` - Memoizes calculated values
- `useCallback` - Memoizes functions
- `useSearchParams` - Reads and updates URL

**Custom hooks:**
- `useBudget` - Manages budget state
- `useLocalStorage` - Saves data in browser

### State
Data that can change and automatically updates the screen:
```typescript
const [count, setCount] = useState(0)
```

### Props
Data that a component receives from outside:
```typescript
<Button label="Click" onClick={handleClick} />
```

---

## Testing

```bash
npm run test          # Run tests
npm run test:watch    # Watch mode (updates automatically)
```

---

## Troubleshooting

**"npm install" doesn't work:**
- Check Node.js: `node --version`
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and try again

**TypeScript errors:**
- Run: `npm run type-check`
- Check types and error messages

**Port already in use:**
- Close other applications using port 5173
- Or change the port in `vite.config.ts`

---

## Learning Resources

- [React](https://react.dev) - Official documentation
- [TypeScript](https://www.typescriptlang.org) - Documentation
- [Vite](https://vite.dev) - Documentation
- [React Router](https://reactrouter.com) - Documentation

---

## Next Steps

- Add new services
- Create new components
- Improve design
- Add more tests
- Publish online

---

This is an educational project developed for learning purposes.
