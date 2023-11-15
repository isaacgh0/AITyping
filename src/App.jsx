import Navbar from './components/navbar'
import Home from './pages/home'
import About from './pages/about'
import { OpenAIProvider } from './common/context/openai'
import './App.sass'
import Contact from './pages/contact'

const AppPreview = () => (
  <>
    <Navbar />
    <main>
      <Home />
      <About />
      <Contact />
    </main>
  </>
)

const App = () => (
  <OpenAIProvider>
    <AppPreview />
  </OpenAIProvider>
)

export default App
