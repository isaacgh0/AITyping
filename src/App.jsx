import Home from './pages/home'
import Navbar from './components/navbar'
import { OpenAIProvider } from './common/context/openai'
import './App.sass'

const AppPreview = () => (
  <>
    <Navbar />
    <main>
      <Home />
    </main>
  </>
)

const App = () => (
  <OpenAIProvider>
    <AppPreview />
  </OpenAIProvider>
)

export default App
