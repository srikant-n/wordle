import { useCallback, useEffect } from "react";
import { useWordContext } from "../context/WordContextHooks";
import type { LetterState } from "../types";

/**
 * Configuration for a single keyboard key.
 * Pre-computed to avoid runtime checks during rendering.
 */
interface KeyConfig {
    key: string;          // The key identifier (e.g., 'A', 'ENTER', 'BACKSPACE')
    label: string;        // Display label (e.g., 'A', 'ENTER', '⌫')
    isSpecial: boolean;   // Whether the key is a special action key (ENTER/BACKSPACE)
}

/**
 * Standard QWERTY keyboard layout with special keys.
 * Used as the base for generating pre-configured rows.
 */
const KEYBOARD_ROWS: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

/**
 * Props for the Keyboard component.
 */
export interface KeyboardProps {
    onKeyClick: (key: string) => void;  // Callback when a key is pressed
}

/**
 * Returns the Tailwind background class for a key based on its letter state.
 * Maps Wordle game states to appropriate color indicators.
 */
const getKeyBgColor = (state: LetterState): string => {
    switch (state) {
        case 'correct':
            return 'bg-green-500 active:bg-green-600';
        case 'present':
            return 'bg-yellow-500 active:bg-yellow-600';
        case 'absent':
            return 'bg-gray-500 active:bg-gray-600';
        default:
            return 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400';
    }
};

/**
 * Pre-computes key configurations to avoid runtime checks during render.
 * This eliminates 54 conditional checks per render (27 keys × 2 checks each).
 * Computed once at module load time.
 */
const CONFIGURED_ROWS: KeyConfig[][] = KEYBOARD_ROWS.map(row =>
    row.map(key => ({
        key,
        label: key === 'BACKSPACE' ? '⌫' : key,
        isSpecial: key === 'ENTER' || key === 'BACKSPACE'
    }))
);

/**
 * Creates a flat Set of all valid keyboard keys for quick lookup.
 */
const VALID_KEYS = new Set(KEYBOARD_ROWS.flat());

/**
 * On-screen keyboard for the Wordle game. Letter keys are colored according
 * to the best-known state from previous guesses.
 *
 * Optimizations:
 * - Event delegation: Single click and keydown handlers on container instead of 27 individual handlers
 * - Pre-computed key configurations: Eliminates runtime conditionals for label and special key detection
 * - useCallback: Prevents function recreation on every render
 */
function Keyboard({ onKeyClick }: KeyboardProps) {
    const { usedLetters } = useWordContext();

    /**
     * Handles click events on the keyboard container using event delegation.
     * Finds the closest button ancestor and triggers the callback with its ID.
     * This avoids attaching individual onClick handlers to each of the 27 buttons.
     */
    const handleContainerClick = useCallback((event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const button = target.closest('button');
        if (button && button.id) {
            onKeyClick(button.id);
        }
    }, [onKeyClick]);

    /**
     * Handles window-level keyboard events to capture input regardless of focus.
     * Maps physical keyboard keys to virtual keyboard keys.
     */
    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();

            // Map Backspace to BACKSPACE, Enter to ENTER
            const mappedKey = event.key === 'Backspace' ? 'BACKSPACE' :
                             event.key === 'Enter' ? 'ENTER' :
                             key;

            if (VALID_KEYS.has(mappedKey)) {
                event.preventDefault();
                onKeyClick(mappedKey);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [onKeyClick]);

    return (
        <div
            className="flex flex-col gap-2"
            onClick={handleContainerClick}
        >
            {CONFIGURED_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 justify-center">
                    {row.map(({ key, label, isSpecial }) => {
                        const letterState = usedLetters[key];

                        return (
                            <button
                                key={key}
                                id={key}
                                className={`${isSpecial ? 'px-4' : 'w-9'} h-12 rounded-md font-bold uppercase text-sm flex items-center justify-center text-black ${getKeyBgColor(letterState)} transition-colors`}
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

export default Keyboard;