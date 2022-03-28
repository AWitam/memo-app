import { Link } from 'react-router-dom'
import './footer.scss'

export const Footer = () => {
  return (
    <footer>
      <div className="footer__content">
        <span>MEMO</span>&nbsp;|&nbsp; <a href="https://github.com/AWitam/memo-app"> See source code</a>
      </div>
    </footer>
  )
}
