import { useEffect } from 'react'
import Header from './components/header'
import Home from './pages/home'
import Profile from './pages/profile'
import About from './pages/about'
import Contact from './pages/contact'
import Footer from './components/footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.sass'

const AppPreview = () => {
  const setCookie = token => {
    const date = new Date()

    date.setTime(date.getTime() + 5 * 24 * 60 * 60 * 1000)
    document.cookie = `token=${token};expires=${date.toUTCString()};path=/`
  }

  useEffect(() => {
    const cookie = document.cookie

    if (cookie === '') {
      fetch('https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/register', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(response => {
          if (!response.status) { return }

          const token = response.token
          setCookie(token)
        })
        .catch(() => console.log('Register error'))
    } else {
      const token = document.cookie.split('=')[1]

      fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/update/entry/${token}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(response => {
          if (!response.status) { return }

          if (!response.wasUpdated) {
            setCookie(response.token)
          }
        })
        .catch(() => console.log('Error update entry'))
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
      <Header />
      <main>
        <Home />
        <Profile />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

const App = () => (
  <AppPreview />
)

export default App
