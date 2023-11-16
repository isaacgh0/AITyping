import { useContext, useState } from 'react'
import OpenAIContext from '../../common/context/openai'
import settings from '../../assets/icons/settings.svg'
import './index.sass'

const Home = () => {
  const [isWritting, setIsWritting] = useState(false)
  const [resVisible, setResVisible] = useState(false)
  const [errors, setErrors] = useState(0)
  const [wpm, setWPM] = useState(0)
  const [precision, setPrecision] = useState(0)
  const [testtext, setTestText] = useState('')

  const aicontext = useContext(OpenAIContext)

  const handlePractice = async () => {
    setIsWritting(true)

    /* const chatCompletion = await aicontext.openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Dame el código de ejemplo cualquiera de una estructura de control en programación, en el lenguaje c++' }],
      model: 'gpt-3.5-turbo'
    })

    setTestText(chatCompletion.choices[0].message.content) */

    setTimeout(() => { setTestText('Hola') }, 10000)
  }

  const writeArea = () => (
    <div className={`write-area ${isWritting && testtext ? '' : 'hidden'}`}>
      <div className={`results ${resVisible ? 'visible' : ''}`}>
        <div className='measure'>
          <span className='code'>Errors</span>
          <span>{errors}</span>
        </div>
        <div className='measure'>
          <span className='code'>Words PM</span>
          <span>{wpm}</span>
        </div>
        <div className='measure'>
          <span className='code'>Precision</span>
          <span>{precision}%</span>
        </div>
      </div>
      <textarea name='pre' id='pre' readOnly value={testtext} />
      <textarea name='test' id='test' />
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
