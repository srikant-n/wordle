import { GuessWords } from './components/GuessWords'
import { Keyboard } from './components/Keyboard'
import { useState } from 'react'

function App() {
  const [currentGuess, setCurrentGuess] = useState('');

  const onKeyClick = (key: string) => {
    if (key === 'ENTER') {
      
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else {
      setCurrentGuess(currentGuess + key);
    }
  };
  
  return (
   <div>
    <GuessWords currentGuess={currentGuess} />
    <Keyboard onKeyClick={onKeyClick} />
   </div>
  )
}

export default App
