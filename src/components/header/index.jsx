import { Link } from 'react-router-dom'
import { PATHS } from '../../common/consts'
import _logo from '../../assets/icons/_logo.svg'
import './index.sass'

const Header = () => {
  const handleGoTo = e => {
    const link = e.currentTarget.getAttribute('link')
    const dom = document.getElementsByClassName(link)[0]

    dom.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <header>
      <nav>
        <ul>
          {PATHS.slice(0, 2).map(inner => (
            <li key={inner.path}>
              <Link
                to={inner.path}
                link={inner.dom}
                onClick={handleGoTo}
              >
                {inner.text}
              </Link>
            </li>
          ))}
          <li className='center'>
            <img src={_logo} alt='logo' id='logo' />
          </li>
          {PATHS.slice(2, 4).map(inner => (
            <li key={inner.path}>
              <Link
                to={inner.path}
                link={inner.dom}
                onClick={handleGoTo}
              >
                {inner.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
