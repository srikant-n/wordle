# Wordle

A simple Wordle game built with React, TypeScript, Vite, and Tailwind CSS.

Guess the hidden five-letter word in six tries. After each guess, the tiles reveal how close your guess was to the target word:

- **Green** — the letter is correct and in the right spot.
- **Yellow** — the letter is in the word but in the wrong spot.
- **Gray** — the letter is not in the word.

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (or your preferred package manager)

### Installation

```bash
npm install
```

### Development

Start the dev server with hot module reloading:

```bash
npm run dev
```

### Build

Type-check and build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

Run the linter:

```bash
npm run lint
```

## Project Structure

```
wordle/
├── public/                 # Static assets (favicon, logo)
├── src/
│   ├── components/         # Reusable UI components (e.g. Tile)
│   ├── context/            # React context, reducer, and provider for game state
│   │   ├── WordContext.tsx
│   │   └── WordProvider.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Tailwind CSS entry
├── index.html
├── vite.config.ts
└── tsconfig.json
```

## How to Play

1. A target word is selected at the start of each game.
2. Type a valid five-letter word and submit your guess.
3. The tiles update to show how each letter compares to the target.
4. You have a maximum of six guesses to find the correct word.
5. The game ends when you guess correctly or run out of guesses.
