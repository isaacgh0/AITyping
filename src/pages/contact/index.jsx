import { useState } from 'react'
import './index.sass'

const Contact = () => {
  const [message, setMessage] = useState('')

  const handleClearMessage = () => {
    setMessage('')
    document.getElementById('user-message').focus()
  }

  const handleUpdateMessage = e => {
    setMessage(e.currentTarget.value)
  }

  const handleSendMessage = () => {

  }

  return (
    <div className='contact'>
      <h1>Contact</h1>
      <p>Write us a message with your opinion, suggestion or disagreement, no names or unnecessaries things</p>
      <div className='message'>
        <textarea name='user-message' id='user-message' placeholder='Message' onInput={handleUpdateMessage} value={message} />
        <div className='actions'>
          <button className='ghost' onClick={handleClearMessage}>Clear</button>
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
