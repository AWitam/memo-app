import './button.scss'

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface Button {
  type?: ButtonType
  children?: JSX.Element | string
  onClick?: (e?: any) => void
}

export const Button = ({ type, children, onClick }: Button) => {
  return (
    <button className={type} onClick={onClick}>
      {children}
    </button>
  )
}
