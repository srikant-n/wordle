import { useWordContext } from "../context/WordContextHooks";
import type { LetterState } from "../types";
import Tile from "./Tile";

/**
 * Component for displaying a group of tiles for a single guessed word.
 *
 * @param letters - The letters of the word.
 * @param letterStates - The state of each letter: 'correct', 'present', 'absent', or '' (default/empty).
 * @param hasError - Whether the word should be highlighted as invalid.
 * @returns The rendered component.
 */

function WordTileGroup({
  letters,
  letterStates,
  hasError,
}: {
  letters: string[];
  letterStates: LetterState[];
  hasError?: boolean;
}) {
  return (
    <div className={`flex gap-4 ${hasError ? "shake" : ""}`}>
      {letters.map((letter, index) => (
        <Tile key={index} letter={letter} status={letterStates[index]} />
      ))}
    </div>
  );
}

/**
 * Component for displaying all guessed words and the current guess.
 *
 * @param currentGuess - The current guess being typed.
 * @param hasError - Whether the current guess should be highlighted as invalid.
 * @param shakeKey - A key to force the shake animation to replay when it changes.
 * @returns The rendered component.
 */
function GuessWords({
  currentGuess,
  hasError,
  shakeKey,
}: {
  currentGuess: string;
  hasError: boolean;
  shakeKey: number;
}) {
  const { usedWords, maxGuessCount, currentGuessNum } = useWordContext();
  const emptyGuess = Array(5).fill("");

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(usedWords).map(([word, letterStates], index) => (
        <WordTileGroup key={index} letters={word.split("")} letterStates={letterStates} />
      ))}
      {currentGuess && (
        <WordTileGroup
          key={`current-${shakeKey}`}
          letters={currentGuess.split("").concat(Array(5 - currentGuess.length).fill(""))}
          letterStates={emptyGuess.concat(Array(5 - currentGuess.length).fill(""))}
          hasError={hasError}
        />
      )}
      {Array.from({ length: maxGuessCount - currentGuessNum - (currentGuess ? 1 : 0) }).map(
        (_, index) => (
          <WordTileGroup key={index} letters={emptyGuess} letterStates={emptyGuess} />
        ),
      )}
    </div>
  );
}

export default GuessWords;
