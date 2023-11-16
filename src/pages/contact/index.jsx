import { useContext, useState } from 'react'
import FirebaseContext from '../../common/context/firebase'
import { toast } from 'react-toastify'
import './index.sass'

const Contact = () => {
  const [message, setMessage] = useState('')

  const firectx = useContext(FirebaseContext)

  const handleClearMessage = () => {
    setMessage('')
    document.getElementById('user-message').focus()
  }

  const handleUpdateMessage = e => {
    setMessage(e.currentTarget.value)
  }

  const handleSendMessage = () => {
    firectx.db.collection('messages').add({
      id: firectx.id, message
    })
      .then(ref => {
        handleClearMessage()
        toast.success('Mensaje enviado')
      })
      .catch(err => {
        console.error(err)
        toast.error('Error al enviar el mensaje')
      })
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
