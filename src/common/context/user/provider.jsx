import UserContext from './context'
import { useState } from 'react'

const UserProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [config, setConfig] = useState({})

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      config,
      setConfig
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
