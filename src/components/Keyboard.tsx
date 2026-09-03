import { useWordContext } from "../context/WordContextHooks";
import type { LetterState } from "../types";

const KEYBOARD_ROWS: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export interface KeyboardProps {
    onKeyClick: (key: string) => void;
}

/**
 * Returns the Tailwind background class for a key based on its letter state.
 */
const getKeyBgColor = (state: LetterState): string => {
    switch (state) {
        case 'correct':
            return 'bg-green-500';
        case 'present':
            return 'bg-yellow-500';
        case 'absent':
            return 'bg-gray-500';
        default:
            return 'bg-gray-200';
    }
};

/**
 * On-screen keyboard for the Wordle game. Letter keys are colored according
 * to the best-known state from previous guesses.
 */
export function Keyboard({ onKeyClick }: KeyboardProps) {
    const { usedLetters } = useWordContext();

    return (
        <div className="flex flex-col gap-2">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 justify-center">
                    {row.map((key) => {
                        const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                        const letterState = usedLetters[key];
                        const label = key === 'BACKSPACE' ? '⌫' : key;

                        return (
                            <button
                                key={key}
                                onClick={() => onKeyClick(key)}
                                className={`${isSpecial ? 'px-4' : 'w-9'} h-12 rounded-md font-bold uppercase text-sm flex items-center justify-center text-black ${getKeyBgColor(letterState)}`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
