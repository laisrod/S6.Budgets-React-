Digital Services Budget Application

A modern web application built with React and TypeScript to create and manage budgets for digital services such as SEO, Advertising, and Websites.


What is this project

This application allows users to select digital services (SEO at 300 euros, Advertising at 400 euros, and Website at 500 euros), configure website options like pages and languages, apply an annual discount of 20 percent for budgets above 1000 euros, calculate totals automatically, create and save budgets, share URLs with specific configurations, and view budget history.


Getting Started

Prerequisites

Node.js version 18 or higher
npm version 9 or higher

Check your installation by running these commands in the terminal:

  node --version
  npm --version


Installation

1. Install dependencies:

  npm install

This downloads all necessary libraries including React, TypeScript, Vite, and others.

2. Start the development server:

  npm run dev

The app opens at http://localhost:5173 and automatically updates when you save changes.

3. Stop the server by pressing Ctrl + C in the terminal.


Available Scripts

npm run dev         Starts the development server
npm run build       Creates an optimized production build
npm run preview     Previews the production build locally
npm run lint        Checks for code errors
npm run lint:fix    Automatically fixes code errors
npm run type-check  Checks TypeScript errors
npm run test        Runs the test suite
npm run test:watch  Runs tests in watch mode
npm run clean       Removes temporary files


Project Structure

orcamentos-react/
  src/
    components/
      atoms/          Small reusable components like Button and Input
      molecules/      Medium components like NumberInput and CheckboxField
      organismos/     Large composed components like WebsiteOptions and QuoteForm
    pages/            Application pages including Calculator and Welcome
    hooks/            Custom hooks like useBudget and useLocalStorage
    services/         Business logic functions like calculateBudget
    config/           Configuration files like ContentService
    styles/           CSS files organized by concern (base, layout, components, utilities)
    types/            TypeScript type definitions
  public/             Static public files
  dist/               Production build output (generated)


Features

Service Selection
Users can choose from three digital services: SEO at 300 euros, Advertising Campaign at 400 euros, and Website at 500 euros. Multiple services can be selected at the same time.

Website Configuration
When the Website service is selected, users can configure the number of pages and languages. The additional cost is calculated as the sum of pages and languages multiplied by 30 euros.

Annual Discount
A 20 percent discount is automatically applied when the total budget exceeds 1000 euros and the user enables the annual billing option.

Shareable URLs
Budget configurations are saved in the URL so they can be shared with others. For example, a URL might include parameters like services, pages, languages, and annual billing preference.

Budget Management
Users can create named budgets, save them locally in the browser, search through saved budgets, and sort them by name, date, or price.


Technologies

React 19 for building the user interface
TypeScript for type safety and better developer experience
Vite as the build tool and development server
React Router for client-side navigation
ESLint for code quality and consistency
Vitest for unit testing


Architecture

This project follows the Atomic Design methodology to organize components into layers of increasing complexity.

Atoms are the smallest building blocks such as Button, Input, Label, Checkbox, and Span. They handle a single responsibility and are highly reusable.

Molecules combine atoms into more functional units like NumberInput, CheckboxField, PriceDisplay, and HelpModal.

Organisms are larger sections composed of molecules and atoms. These include WebsiteOptions, QuoteForm, ServiceCheckbox, BudgetsList, and Total.

Pages are full views that compose organisms together. The application has two pages: Welcome and Calculator.

This architecture promotes reusable components, organized code, and easy maintenance.


Custom Hooks

useBudget manages the entire budget state including selected services, website options, annual discount, and the list of saved budgets.

useLocalStorage provides persistent storage in the browser so that saved budgets survive page reloads.


Testing

Run the full test suite:

  npm run test

Run tests in watch mode so they re-run automatically when files change:

  npm run test:watch


Troubleshooting

If npm install does not work, check your Node.js version with node --version, clear the npm cache with npm cache clean --force, delete the node_modules folder, and try again.

If you see TypeScript errors, run npm run type-check and review the error messages for details about the types involved.

If the port is already in use, close other applications that may be using port 5173 or change the port in vite.config.ts.


Learning Resources

React official documentation at https://react.dev
TypeScript documentation at https://www.typescriptlang.org
Vite documentation at https://vite.dev
React Router documentation at https://reactrouter.com


This is an educational project developed as part of the IT Academy Sprint 6 curriculum.
