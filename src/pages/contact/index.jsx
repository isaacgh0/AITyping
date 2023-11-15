import './index.sass'

const Contact = () => {
  return (
    <div className='contact'>
      <h1>Contact</h1>
      <p>Write us a message with your opinion, suggestion or disagreement, no names or unnecessaries things</p>
      <div className='message'>
        <textarea name='user-message' id='user-message' placeholder='Message' />
        <div className='actions'>
          <button className='ghost'>Clear</button>
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
