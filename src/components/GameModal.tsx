import { useWordContext } from "../context/WordContextHooks";

/**
 * Modal component that displays at the end of the game.
 * Shows either a win or lose message along with the correct word.
 */
function GameModal() {
  const { isCorrect, word } = useWordContext();
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-2xl text-center">
          {isCorrect ? (
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
              <p className="text-xl text-gray-700 mb-6">You guessed the word correctly!</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over</h2>
              <p className="text-xl text-gray-700 mb-6">You ran out of guesses!</p>
            </>
          )}
          <p className="text-2xl font-bold text-gray-800 mb-6">
            The word was: <span className="text-green-600">{word}</span>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
}

export default GameModal;
