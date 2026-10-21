export type LetterState = "correct" | "present" | "absent" | "";

export type WordContextType = {
    word: string;
    usedWords: { [key: string]: LetterState[] };
    usedLetters: { [key: string]: LetterState };
    maxGuessCount: number;
    currentGuessNum: number;
    isGameOver: boolean;
    isCorrect: boolean;
}

export type WordDispatchContextType = {
    type: string;
    payload: string;
};

export interface TileProps {
    letter?: string;
    status: LetterState;
}