import { useContext, useEffect } from 'react'
import UserContext, { UserProvider } from './common/context/user'
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
  const usrctx = useContext(UserContext)

  const setData = token => {
    const date = new Date()

    date.setTime(date.getTime() + 5 * 24 * 60 * 60 * 1000)
    document.cookie = `token=${token};expires=${date.toUTCString()};path=/`

    usrctx.setToken(token)

    fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/config/${token}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        if (!response.status) { return }
        usrctx.setConfig(response.conf)
      })
      .catch(err => console.log(err))
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
          setData(token)
        })
        .catch(err => console.log(err))
    } else {
      const token = document.cookie.split('=')[1]

      fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/update/entry/${token}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(response => {
          if (!response.status) { return }

          if (!response.wasUpdated) {
            setData(response.token)
          }
        })
        .catch(err => console.log(err))
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
  <UserProvider>
    <AppPreview />
  </UserProvider>
)

export default App
