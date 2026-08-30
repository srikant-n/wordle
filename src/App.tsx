import WordProvider from './context/WordProvider'
import Tile from './components/Tile'

function App() {
  return (
   <WordProvider>
    <div><Tile status="" /></div>
   </WordProvider>
  )
}

export default App
