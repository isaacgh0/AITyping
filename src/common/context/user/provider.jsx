import UserContext from './context'
import { useState } from 'react'

const UserProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [config, setConfig] = useState({})

  const set = token => {
    setToken(token)
  }

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      config,
      setConfig,
      set
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
