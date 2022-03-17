import './landingPage.scss'
import landingPic from '../../assets/img/landing-pic.jpg'
import { Button, ButtonType } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../app/routes'

export const LandingPage = () => {
  return (
    <section>
      <div className="content__left">
        <h1>Learn anything</h1>
        <div className="content__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae eleifend sapien.
            Aenean massa sem, congue eget vehicula nec, suscipit nec lectus.
          </p>
        </div>
        <Button type={ButtonType.primary}>
          <Link to={`/${ROUTES.signUp}`}>Get started</Link>
        </Button>
      </div>
      <div className="content__right">
        <div className="img__wrapper">
          <img src={landingPic} alt="Landing page image" />
        </div>
      </div>
    </section>
  )
}
