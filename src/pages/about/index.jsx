import audictore from '../../assets/images/audictore.jpeg'
import saky from '../../assets/images/saky.png'
import jajc from '../../assets/images/jajc.png'
import crossrelic from '../../assets/images/crossrelic.png'
import pao from '../../assets/images/pao.jpeg'
import github from '../../assets/icons/github.svg'
import './index.sass'

const About = () => (
  <div className='about'>
    <div className='top'>
      <h1>About</h1>
      <p>Open source web project to practice typing skills using AI-GPT technology</p>
      <button>
        <a href='https://github.com/isaacgh0/AITyping' target='_blank' rel='noreferrer'>
          <img src={github} alt='Project Repository' title='GitHub Repository' />
        </a>
      </button>
    </div>
    <div className='bottom'>
      <h2>Team</h2>
      <div className='cards'>
        <div className='card'><img src={audictore} alt='Audictore' /><span>Audictore</span></div>
        <div className='card'><img src={saky} alt='Saky' /><span>sAky</span></div>
        <div className='card'><img src={jajc} alt='Jajc' /><span>jAjc</span></div>
        <div className='card'><img src={crossrelic} alt='Crossrelic' /><span>crossrelic</span></div>
        <div className='card'><img src={pao} alt='Paolina B.' /><span>pAolina b.</span></div>
      </div>
    </div>
  </div>
)

export default About
