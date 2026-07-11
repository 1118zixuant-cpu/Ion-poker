import { Card, CardType, Compound } from './types';

const CATIONS: Omit<Card, 'id'>[] = [
  { type: 'cation', symbol: 'Na+', charge: 1, name: 'Sodium' },
  { type: 'cation', symbol: 'K+', charge: 1, name: 'Potassium' },
  { type: 'cation', symbol: 'Ca2+', charge: 2, name: 'Calcium' },
  { type: 'cation', symbol: 'Mg2+', charge: 2, name: 'Magnesium' },
  { type: 'cation', symbol: 'Al3+', charge: 3, name: 'Aluminum' },
  { type: 'cation', symbol: 'Fe2+', charge: 2, name: 'Iron(II)' },
  { type: 'cation', symbol: 'Fe3+', charge: 3, name: 'Iron(III)' },
  { type: 'cation', symbol: 'Cu2+', charge: 2, name: 'Copper(II)' },
  { type: 'cation', symbol: 'Zn2+', charge: 2, name: 'Zinc' },
  { type: 'cation', symbol: 'NH4+', charge: 1, name: 'Ammonium' },
];

const ANIONS: Omit<Card, 'id'>[] = [
  { type: 'anion', symbol: 'Cl-', charge: -1, name: 'Chloride' },
  { type: 'anion', symbol: 'Br-', charge: -1, name: 'Bromide' },
  { type: 'anion', symbol: 'I-', charge: -1, name: 'Iodide' },
  { type: 'anion', symbol: 'F-', charge: -1, name: 'Fluoride' },
  { type: 'anion', symbol: 'O2-', charge: -2, name: 'Oxide' },
  { type: 'anion', symbol: 'S2-', charge: -2, name: 'Sulfide' },
  { type: 'anion', symbol: 'NO3-', charge: -1, name: 'Nitrate' },
  { type: 'anion', symbol: 'SO42-', charge: -2, name: 'Sulfate' },
  { type: 'anion', symbol: 'CO32-', charge: -2, name: 'Carbonate' },
  { type: 'anion', symbol: 'PO43-', charge: -3, name: 'Phosphate' },
];

const MODIFIERS: Omit<Card, 'id'>[] = [
  { type: 'modifier', symbol: '2x', charge: 0, name: 'Double' },
  { type: 'modifier', symbol: '3x', charge: 0, name: 'Triple' },
];

let cardIdCounter = 0;

function createCard(template: Omit<Card, 'id'>): Card {
  return {
    ...template,
    id: `card-${cardIdCounter++}`,
  };
}

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  for (let i = 0; i < 2; i++) {
    CATIONS.forEach(c => deck.push(createCard(c)));
    ANIONS.forEach(a => deck.push(createCard(a)));
  }
  
  MODIFIERS.forEach(m => {
    deck.push(createCard(m));
    deck.push(createCard(m));
  });
  
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function isNeutralCompound(compound: Compound): boolean {
  let totalCharge = compound.cation.charge + compound.anion.charge;
  return totalCharge === 0;
}

export function getCompoundFormula(compound: Compound): string {
  const cation = compound.cation.symbol;
  const anion = compound.anion.symbol;
  
  if (compound.cation.charge === -compound.anion.charge) {
    return `${cation.replace(/[+\\d]/g, '')}${anion.replace(/[-\\d]/g, '')}`;
  }
  
  const cationCharge = Math.abs(compound.anion.charge);
  const anionCharge = Math.abs(compound.cation.charge);
  
  const cationSub = cationCharge > 1 ? `${cationCharge}` : '';
  const anionSub = anionCharge > 1 ? `${anionCharge}` : '';
  
  return `${cation.replace(/[+\\d]/g, '')}${anionSub}${anion.replace(/[-\\d]/g, '')}${cationSub}`;
}

export function calculateScore(compound: Compound): number {
  let score = 10;
  
  if (compound.modifier) {
    const multiplier = compound.modifier.symbol === '2x' ? 2 : 3;
    score *= multiplier;
  }
  
  return score;
}
