import { useState } from 'react'
import FirebaseContext from './context'
import { db } from './firebase'

const FirebaseProvider = ({ children }) => {
  const [id, setID] = useState('')

  return (
    <FirebaseContext.Provider value={{ db, id, setID }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
