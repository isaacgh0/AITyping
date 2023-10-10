import { useEffect, useState } from 'react'
import shift from '../../assets/icons/arrow-big-up.svg'
import backspace from '../../assets/icons/arrow-narrow-left.svg'
import tab from '../../assets/icons/arrows-exchange-2.svg'
import enter from '../../assets/icons/corner-down-left.svg'
import space from '../../assets/icons/space.svg'
import './index.sass'

const Home = () => {
  const [isVisibleKeyboard, setIsVisibleKeyboard] = useState(false)
  const keys = [
    [
      { main: '|', shift: '°', altgr: '¬' },
      { main: '1', shift: '!' },
      { main: '2', shift: '"' },
      { main: '3', shift: '#' },
      { main: '4', shift: '$' },
      { main: '5', shift: '%' },
      { main: '6', shift: '&' },
      { main: '7', shift: '/' },
      { main: '8', shift: '(' },
      { main: '9', shift: ')' },
      { main: '0', shift: '=' },
      { main: '\'', shift: '?', altgr: '\\' },
      { main: '¿', shift: '¡' },
      { main: 'Backspace', icon: backspace }
    ],
    [
      { main: 'Tab', icon: tab },
      { main: 'Q' },
      { main: 'W' },
      { main: 'E' },
      { main: 'R' },
      { main: 'T' },
      { main: 'Y' },
      { main: 'U' },
      { main: 'I' },
      { main: 'O' },
      { main: 'P' },
      { main: '+', shift: '*' },
      { main: '}', shift: ']' }
    ],
    [
      { main: 'CapsLock' },
      { main: 'A' },
      { main: 'S' },
      { main: 'D' },
      { main: 'F' },
      { main: 'G' },
      { main: 'H' },
      { main: 'J' },
      { main: 'K' },
      { main: 'L' },
      { main: 'Ñ' },
      { main: '{', shift: '[' },
      { main: 'Enter', icon: enter }
    ],
    [
      { main: 'Shift', icon: shift },
      { main: '<', shft: '>' },
      { main: 'Z' },
      { main: 'X' },
      { main: 'C' },
      { main: 'V' },
      { main: 'B' },
      { main: 'N' },
      { main: 'M' },
      { main: ',', shift: ';' },
      { main: '.', shift: ':' },
      { main: '-', shift: '-' },
      { main: 'Control' }
    ],
    [
      { main: 'Alt' },
      { main: ' ', icon: space },
      { main: 'AltGraph' }
    ]
  ]

  useEffect(() => {
    window.addEventListener('keydown', e => {
      const key = `${e.key === '\'' || e.key === '\\' ? '\\' : ''}${e.key}`
      const keyDOM = document.querySelector(`span.keycode[alter='${key}']`)

      if (keyDOM) {
        keyDOM.parentElement.classList.add('pressed')
      }

      e.getModifierState('CapsLock')
    })

    window.addEventListener('keyup', () => {
      const visualKey = [...document.querySelectorAll('div.key.pressed')]

      visualKey.forEach(item => {
        item.classList.remove('pressed')
      })
    })
  }, [])

  return (
    <main>
      <h1>Typing skills</h1>
      <span className='spectacular'>Improve your typing skills with AI support</span>
      <button>Start to practice</button>
      {isVisibleKeyboard
        ? <div className='keyboard'>
          {keys.map((row, i) => (
            <div className='row' key={i}>
              {row.map((keycodes, index) => (
                <div className='key' key={index}>
                  {keycodes.icon
                    ? <img src={keycodes.icon} alt={keycodes.main} alter={keycodes.main} />
                    : <span className='keycode' alter={keycodes.main}>{keycodes.main}</span>}
                  {keycodes.shift
                    ? <span className='keycode' alter={keycodes.shift}>{keycodes.shift}</span>
                    : <></>}
                  {keycodes.shift
                    ? <span className='keycode' alter={keycodes.altgr}>{keycodes.altgr}</span>
                    : <></>}
                </div>
              ))}
            </div>
          ))}
        </div>
        : <></>}
    </main>
  )
}

export default Home
