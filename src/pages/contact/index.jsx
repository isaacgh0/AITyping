import { useContext, useState } from 'react'
import UserContext from '../../common/context/user'
import { toast } from 'react-toastify'
import './index.sass'

const Contact = () => {
  const [message, setMessage] = useState('')

  const usrctx = useContext(UserContext)

  const handleClearMessage = () => {
    setMessage('')
    document.getElementById('user-message').focus()
  }

  const handleUpdateMessage = e => {
    setMessage(e.currentTarget.value)
  }

  const handleSendMessage = () => {
    fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/message/${usrctx.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.status) {
          return toast.error('No se pudo enviar el mensaje')
        }

        toast.success('Mensaje enviado')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='contact'>
      <h1>Contact</h1>
      <p>Write us a message with your opinion, suggestion or disagreement, no names or unnecessaries fields</p>
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
