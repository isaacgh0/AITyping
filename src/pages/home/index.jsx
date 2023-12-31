import { useContext, useEffect, useState } from 'react'
import UserContext from '../../common/context/user'
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

  const usrctx = useContext(UserContext)

  const handlePractice = () => {
    setIsWritting(true)

    fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/text/${usrctx.token}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        if (!response.status) { return }

        setTestText(response.text)
      })
      .catch(err => console.log(err))
  }

  const handleKeyDown = e => {
    const regex = /[a-zA-Z0-9 .,!?;:"()@#$%&*_+=-]/

    if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
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
      duration = Number(duration.toFixed(2))

      const words = arrText.length * 60 / duration
      const pres = 100 - (errs * 100 / arrText.length)

      setErrors(errs)
      setPrecision(pres)
      setWPM(words)

      setResVisible(true)

      fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/test/register/${usrctx.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpm: Number(words.toFixed(2)),
          date: new Date().toUTCString(),
          time: duration,
          length: arrText.length,
          errors: Number(errs.toFixed(2)),
          precision: Number(pres.toFixed(2))
        })
      })
        .then(response => response.json())
        .then(response => {
          if (!response.status) {
            console.log('cant register data')
          }
        })
        .catch(err => console.log(err))
    }
  }, [begin, end])

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
