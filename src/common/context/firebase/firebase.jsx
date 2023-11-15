import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const config = {
  apiKey: 'AIzaSyAPy2Umd6nfaBMYZiGdW5jbPWgKanLayDM',
  authDomain: 'aityping.firebaseapp.com',
  projectId: 'aityping',
  storageBucket: 'aityping.appspot.com',
  messagingSenderId: '404181232928',
  appId: '1:404181232928:web:cf86451afb462dd5b3fb45'
}

firebase.initializeApp(config)

const db = firebase.firestore()

export { db }
