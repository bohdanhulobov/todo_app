# Todo App

A modern, responsive Todo application built with React, TypeScript, and Material UI.

## Features

- **User Authentication**: Login system with demo accounts
- **Todo Management**: Create, read, update, and delete todo items
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Status Tracking**: Track todo status (todo, in-progress, done)
- **Responsive Design**: Works on mobile, tablet, and desktop screens
- **Dark/Light Theme**: Toggle between dark and light themes
- **Internationalization**: Support for English and Ukrainian languages
- **Local Storage**: Todos persist between sessions using browser local storage

## Tech Stack

- **React 19**: Frontend library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **Material UI**: Component library for consistent UI
- **i18next**: Internationalization framework
- **Context API**: State management

## Project Structure

```
todo_app/
├── public/               # Static assets
├── src/                  # Source files
│   ├── components/       # React components
│   ├── context/          # Context providers
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization
│   │   └── locales/      # Translation files
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── index.html            # HTML entry point
└── package.json          # Project metadata and dependencies
```

## Getting Started

### Prerequisites

- Node.js (version 16.x or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd todo_app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open http://localhost:5173 in your browser

### Authentication

Demo users for testing:

- Username: `user1`, Password: `password1`
- Username: `user2`, Password: `password2`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Application Architecture

### Context Providers

- **AuthContext**: Manages user authentication state
- **TodoContext**: Handles todo items CRUD operations
- **ThemeContext**: Controls light/dark theme settings
- **LanguageContext**: Manages internationalization

### Key Components

- **TodoList**: Main component that displays and manages todos
- **TodoItem**: Individual todo item with edit capabilities
- **TodoForm**: Form for creating new todo items
- **Header**: App header with theme and language controls
- **Login**: Authentication form

## License

[MIT](LICENSE)
