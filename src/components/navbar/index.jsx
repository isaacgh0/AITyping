import { Link } from 'react-router-dom'
import PATHS from '../../common/consts/paths'

const Navbar = () => (
  <nav>
    {Object.values(PATHS).map(inner => (
      <li key={inner.path}>
        <Link to={inner.path}>{inner.text}</Link>
      </li>
    ))}
  </nav>
)

export default Navbar
