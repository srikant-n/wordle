import { createContext } from "react";

export type LetterState = "correct" | "present" | "absent" | "";

export type WordContextType = {
    word: string;
    usedWords: [string, LetterState[]][];
    usedLetters: { [key: string]: LetterState };
    maxGuesses: number;
    currentGuess: number;
    isGameOver: boolean;
    isCorrect: boolean;
}

export type WordDispatchContextType = {
    type: string; 
    payload: string
};


export const WordContext = createContext<WordContextType | null>(null);
export const WordDispatchContext = createContext<React.Dispatch<WordDispatchContextType> | null>(null);