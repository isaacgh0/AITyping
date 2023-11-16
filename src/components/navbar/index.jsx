import { Link } from 'react-router-dom'
import PATHS from '../../common/consts/paths'
import _logo from '../../assets/icons/_logo.svg'
import './index.sass'

const Navbar = () => (
  <header>
    <nav>
      <ul>
        {Object.values(PATHS).slice(0, 2).map(inner => (
          <li key={inner.path}>
            <Link to={inner.path}>{inner.text}</Link>
          </li>
        ))}
        <li className='center'>
          <img src={_logo} alt='logo' id='logo' />
        </li>
        {Object.values(PATHS).slice(2, 4).map(inner => (
          <li key={inner.path}>
            <Link to={inner.path}>{inner.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default Navbar
