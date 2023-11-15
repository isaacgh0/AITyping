import Home from './pages/home'
import Navbar from './components/navbar'
import './App.sass'

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
    </>
  )
}

export default App
