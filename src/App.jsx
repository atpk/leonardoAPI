import './App.css'
import History from './components/History'
import Prompt from './components/Prompt'

function App() {
  const user_id = "ambaram";

  return (
    <>
    <Prompt user_id={user_id}/>
    <History user_id={user_id}/>
    </>
  )
}

export default App
