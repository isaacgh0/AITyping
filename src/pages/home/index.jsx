import { useContext, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import OpenAIContext from '../../common/context/openai'
import FirebaseContext from '../../common/context/firebase'
import settings from '../../assets/icons/settings.svg'
import './index.sass'

const Home = () => {
  const [isWritting, setIsWritting] = useState(false)
  const [resVisible, setResVisible] = useState(false)
  const [errors, setErrors] = useState(0)
  const [wpm, setWPM] = useState(0)
  const [precision, setPrecision] = useState(0)
  const [testtext, setTestText] = useState('')
  const [text, setText] = useState('')
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  const aicontext = useContext(OpenAIContext)
  const firectx = useContext(FirebaseContext)

  const handlePractice = async () => {
    setIsWritting(true)

    // const chatCompletion = await aicontext.openai.chat.completions.create({
    //  messages: [{ role: 'user', content: 'Dame un texto de entre 45 y 60 palabras acerca de un suceso historico para el mundo de la programación' }],
    //  model: 'gpt-3.5-turbo'
    // })
    //
    // setTestText(chatCompletion.choices[0].message.content)

    setTimeout(() => setTestText('Hola esta es una prueba de texto'), 1000)
  }

  const handleKeyDown = e => {
    const regex = /[a-zA-Z0-9 .,!?;:"()@#$%&*_+=-]/

    console.log(e.key)

    if (e.key === 'Backspace' || e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      return
    }

    if (!regex.test(e.key)) {
      e.preventDefault()
    }

    if (text === '') {
      setBegin(window.performance.now())
    }
  }

  const handleKeyUp = e => {
    if (testtext.length === text.length) {
      document.getElementById('pre').focus()

      e.currentTarget.readOnly = true

      setEnd(window.performance.now())
    }
  }

  const handleChange = e => {
    setText(e.currentTarget.value)
  }

  const handleRepeat = () => {
    const test = document.getElementById('test')

    test.readOnly = false

    setResVisible(false)

    setErrors(0)
    setPrecision(0)
    setWPM(0)

    setTestText('')
    setText('')

    setBegin(null)
    setEnd(null)

    handlePractice()
  }

  const writeArea = () => (
    <div className={`write-area ${isWritting && testtext ? '' : 'hidden'}`}>
      <div className={`results ${resVisible ? 'visible' : ''}`}>
        <div className='measures'>
          <span className='code'>Errors: {errors}</span>
          <span className='code'>Words PM: {wpm}</span>
          <span className='code'>Precision: {precision}%</span>
        </div>
        <button onClick={handleRepeat}>Repeat</button>
      </div>
      <textarea name='pre' id='pre' readOnly value={testtext} />
      <textarea
        name='test'
        id='test'
        value={text}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
      />
    </div>
  )

  const landing = () => (
    <div className={`landing ${isWritting ? 'hidden' : ''}`}>
      <div className='spectacular'>
        <div className='container'>
          <span>improve your typing skills</span>
        </div>
        <div className='line' />
        <span className='code'>Start now</span>
      </div>
      <button onClick={handlePractice}>Practice</button>
    </div>
  )

  const skeleton = () => (
    <div className='skeleton'>
      <div className='loader max' />
      <div className='loader min' />
    </div>
  )

  const keyboard = () => (
    <div className='keyboard' />
  )

  useEffect(() => {
    if (begin && end) {
      const arrTestText = testtext.split('')
      const arrText = text.split('')

      let errs = 0

      for (let i = 0; i < arrTestText.length; i++) {
        if (arrTestText[i] !== arrText[i]) {
          errs++
        }
      }

      let duration = end - begin
      duration = duration / 1000

      const words = arrText.length * 60 / duration
      const pres = 100 - (errs * 100 / arrText.length)

      setErrors(errs)
      setPrecision(pres)
      setWPM(words)

      setResVisible(true)

      firectx.db.collection('Users').doc(firectx.id).set({
        time: firebase.firestore.FieldValue.increment(duration),
        characters: firebase.firestore.FieldValue.increment(arrTestText.length)
      }, { merge: true })

      firectx.db.collection('Tests').add({
        _user: firectx.id,
        errors: errs,
        precision: pres,
        wordspm: words,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(ref => {})
        .catch(err => { console.log(err) })
    }
  }, [begin, end])

  return (
    <div className='home' id='home'>
      <button className='config'>
        <img src={settings} alt='config' />
      </button>
      {isWritting && !testtext ? skeleton() : <></>}
      {isWritting && testtext ? writeArea() : landing()}
      {isWritting && testtext ? keyboard() : <></>}
    </div>
  )
}

export default Home
