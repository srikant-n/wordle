import { useEffect, useState } from "react";
import GuessWords from "./components/GuessWords";
import Keyboard from "./components/Keyboard";
import GameModal from "./components/GameModal";
import { VALID_WORDS } from "./data/validWords";
import { WORDLE_WORDS } from "./data/wordleWords";
import { useWordContext, useWordDispatch } from "./context/WordContextHooks";

const WORD_LENGTH = 5;

function App() {
  const dispatch = useWordDispatch();
  const { usedWords, isCorrect, isGameOver } = useWordContext();
  const [currentGuess, setCurrentGuess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Increments on each error to force the shake animation to replay
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    const randomWord = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    console.log(randomWord);
    dispatch?.({ type: "SET_WORD", payload: randomWord });
  }, []);

  const onKeyClick = (key: string) => {
    if (key === "ENTER") {
      if (currentGuess.length === WORD_LENGTH) {
        if (VALID_WORDS.includes(currentGuess.toLowerCase())) {
          if (usedWords[currentGuess]) {
            setErrorMessage("Word already used");
            setShakeKey((prev) => prev + 1);
            return;
          }
          dispatch?.({ type: "SUBMIT_WORD", payload: currentGuess });
          setErrorMessage("");
          setCurrentGuess("");
        } else {
          setErrorMessage("Not a valid word");
          setShakeKey((prev) => prev + 1);
        }
      }
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
      setErrorMessage("");
    } else {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(currentGuess + key);
        setErrorMessage("");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-start min-h-screen p-4 md:pt-8 lg:pt-12">
      <GuessWords currentGuess={currentGuess} hasError={!!errorMessage} shakeKey={shakeKey} />
      <p className="text-red-500 m-2 h-5">{errorMessage}</p>
      <Keyboard onKeyClick={onKeyClick} />
      {isGameOver && <GameModal />}
    </div>
  );
}

export default App;
