import { useReducer } from "react";
import type * as React from "react";
import { WordContext, WordDispatchContext } from "./WordContext";
import type { WordContextType, WordDispatchContextType, LetterState } from "../types";

/**
 * Initial game state for the Wordle reducer.
 */
const INITIAL_STATE: WordContextType = {
  word: "",
  usedWords: {},
  usedLetters: {},
  maxGuessCount: 6,
  currentGuessNum: 0,
  isGameOver: false,
  isCorrect: false,
};

/**
 * Evaluates a guessed word against the target word and returns the state
 * of each letter: 'correct', 'present', 'absent', or '' (default/empty).
 *
 * @param word - The target word to compare against.
 * @param userWord - The user's guessed word.
 * @returns An array of letter states matching `userWord` length.
 */
const getWordState: (word: string, userWord: string) => LetterState[] = (
  word: string,
  userWord: string,
) => {
  const letters = word.split("");
  const userLetters = userWord.split("");

  // First pass: mark exact matches as 'correct' and letters not in the word as 'absent'.
  let wordState: LetterState[] = userLetters.map((letter, index) => {
    if (letter === letters[index]) {
      letters[index] = "";
      return "correct";
    }
    if (!letters.includes(letter)) {
      return "absent";
    }
    return "";
  });

  // Second pass: mark any remaining unmatched letters that exist elsewhere as 'present'.
  wordState = userLetters.map((letter, index) => {
    const letterIndex = letters.indexOf(letter);
    if (letterIndex !== -1) {
      letters[letterIndex] = "";
      return "present";
    }

    return wordState[index] || "absent";
  });

  return wordState;
};

/**
 * Reducer for the Wordle game state.
 *
 * @param state - The current game state.
 * @param action - The dispatched action.
 * @returns The updated game state.
 */
export const wordReducer = (
  state: WordContextType,
  action: WordDispatchContextType,
): WordContextType => {
  switch (action.type) {
    case "SET_WORD":
      return { ...INITIAL_STATE, word: action.payload };
    case "SUBMIT_WORD":
      // Ignore duplicate guesses.
      if (state.usedWords[action.payload]) {
        return state;
      }
      const wordState = getWordState(state.word, action.payload);
      const newUsedLetters = { ...state.usedLetters };
      // Track the best-known state for each letter used in this guess.
      action.payload.split("").forEach((letter, index) => {
        newUsedLetters[letter] = wordState[index];
      });

      const currentGuessNum = state.currentGuessNum + 1;
      const isCorrect = action.payload === state.word;
      const isGameOver = isCorrect || currentGuessNum >= state.maxGuessCount;

      return {
        ...state,
        usedWords: { ...state.usedWords, [action.payload]: wordState },
        usedLetters: newUsedLetters,
        currentGuessNum,
        isCorrect,
        isGameOver,
      };
    default:
      return state;
  }
};

/**
 * Provides the Wordle game state and dispatch function to child components.
 */
export default function WordProvider({ children }: { children: React.ReactNode }) {
  const [word, dispatch] = useReducer(wordReducer, INITIAL_STATE);

  return (
    <WordContext value={word}>
      <WordDispatchContext value={dispatch}>{children}</WordDispatchContext>
    </WordContext>
  );
}
