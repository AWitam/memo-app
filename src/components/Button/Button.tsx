import './button.scss'

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface Button {
  type?: ButtonType
  children?: JSX.Element | string
}

export const Button = ({ type, children }: Button) => {
  return <button className={type}>{children}</button>
}
