
import { useWordContext } from "../context/WordContextHooks";
import type { LetterState } from "../types";
import Tile from "./Tile";

function WordTileGroup({letters, letterStates}: { letters: string[]; letterStates: LetterState[]; }) {
    return (
        <div className="flex gap-4">
            {letters.map((letter, index) => (
                <Tile key={index} letter={letter} status={letterStates[index]} />
            ))}
        </div>
    );
}

export function GuessWords({currentGuess}: {currentGuess: string}) {
    const { usedWords, maxGuessCount, currentGuessNum } = useWordContext();
    const emptyGuess = Array(5).fill('');

    return(
        <div className="flex flex-col gap-4">
            {usedWords.map((word, index) => (
                <WordTileGroup key={index} letters={word[0].split('')} letterStates={word[1]} />
            ))}
            {currentGuess && (
                <WordTileGroup key="current" letters={currentGuess.split('').concat(Array(5 - currentGuess.length).fill(''))} letterStates={emptyGuess.concat(Array(5 - currentGuess.length).fill(''))} />
            )}
            {Array.from({ length: maxGuessCount - currentGuessNum - (currentGuess ? 1 : 0) }).map((_, index) => (
                <WordTileGroup key={index} letters={emptyGuess} letterStates={emptyGuess} />
            ))}
        </div>
    )
}