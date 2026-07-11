# ⚛️ Ion Poker

A strategic card game combining chemistry and poker!

## Overview

Ion Poker is a web-based educational game where players form neutral ionic compounds to score points. Match cations (positive ions) with anions (negative ions) to create valid compounds and reach 100 points first!

## Features

- **Interactive Gameplay**: Click cards to select, form compounds, and submit
- **Real-time Validation**: See if your compound is neutral before submitting
- **Scoring System**: Earn 10 points per compound (up to 30 with modifiers)
- **AI Opponent**: Play against a simple AI opponent
- **Educational**: Learn about ionic compounds and oxidation numbers
- **Responsive UI**: Works on desktop and tablet

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/1118zixuant-cpu/Ion-poker.git
cd Ion-poker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. **Select Cards**: Click on cards in your hand to select them
2. **Form a Compound**: Choose one cation (red, positive) and one anion (blue, negative)
3. **Check Charge**: The table shows if your compound is neutral (total charge = 0)
4. **Submit**: Click "Submit Compound" to score points
5. **Win**: First to 100 points wins!

### Game Rules

- Each player starts with 5 cards
- Valid compounds must have a total charge of 0
- Incorrect attempts: 3 strikes and you lose
- Modifiers can multiply your score (2x or 3x)
- Skip your turn if you can't form a valid compound

## Card Types

### Cations (Red - Positive)
- Na⁺, K⁺, Ca²⁺, Mg²⁺, Al³⁺, Fe²⁺, Fe³⁺, Cu²⁺, Zn²⁺, NH₄⁺

### Anions (Blue - Negative)
- Cl⁻, Br⁻, I⁻, F⁻, O²⁻, S²⁻, NO₃⁻, SO₄²⁻, CO₃²⁻, PO₄³⁻

### Modifiers (Purple)
- 2x (double points)
- 3x (triple points)

## Tech Stack

- **React** 18 - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Project Structure

```
src/
├── components/        # React components
│   ├── Card.tsx      # Individual card component
│   ├── GameBoard.tsx # Main game board
│   ├── Hand.tsx      # Player hand display
│   ├── ScoreBoard.tsx# Score tracking
│   ├── StartScreen.tsx# Game start screen
│   └── Table.tsx     # Compound formation area
├── gameLogic.ts      # Game rules and calculations
├── types.ts          # TypeScript interfaces
├── App.tsx           # Main app component
└── main.tsx          # React entry point
```

## Future Enhancements

- [ ] Multiplayer (online)
- [ ] Advanced chemistry (polyatomic ions, oxidation states)
- [ ] Power-ups and special cards
- [ ] Leaderboard
- [ ] Sound effects and animations
- [ ] Mobile app
- [ ] Tutorial mode

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

MIT
