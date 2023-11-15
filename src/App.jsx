import { useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import Navbar from './components/navbar'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import { OpenAIProvider } from './common/context/openai'
import FirebaseContext, { FirebaseProvider } from './common/context/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.sass'

const AppPreview = () => {
  const firectx = useContext(FirebaseContext)

  useEffect(() => {
    const cookie = document.cookie

    if (cookie === '') {
      const id = uuid()
      const date = new Date()

      date.setTime(date.getTime() + 5 * 24 * 60 * 60 * 1000)
      const expires = `expires=${date.toUTCString()};`

      document.cookie = `id=${id};${expires}path=/`

      firectx.setID(id)
    } else {
      const id = document.cookie.split('=')[1]
      firectx.setID(id)
    }
  }, [])
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        draggable={false}
        closeOnClick
        pauseOnHover
        theme='dark'
      />
      <Navbar />
      <main>
        <Home />
        <About />
        <Contact />
      </main>
    </>
  )
}

const App = () => (
  <FirebaseProvider>
    <OpenAIProvider>
      <AppPreview />
    </OpenAIProvider>
  </FirebaseProvider>
)

export default App
