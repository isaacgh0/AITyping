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
    /* const chatCompletion = await aicontext.openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say me something' }],
      model: 'gpt-3.5-turbo'
    })

    console.log(chatCompletion) */

    setIsWritting(true)
  }

  const writeArea = () => (
    <div className='write-area'>
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
      <textarea name='pre' id='pre' readOnly>{testtext}</textarea>
      <textarea name='test' id='test' />
    </div>
  )

  const landing = () => (
    <div className='landing'>
      <div className='spectacular'>
        <span>improve your typing skills</span>
        <div />
        <span className='code'>Start to write</span>
      </div>
      <button onClick={handlePractice}>Practice</button>
    </div>
  )
  return (
    <div className='home' id='home'>
      <button className='config'>
        <img src={settings} alt='config' />
      </button>
      {isWritting ? writeArea() : landing()}
    </div>
  )
}

export default Home
