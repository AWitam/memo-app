import './button.scss'

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface Button {
  type?: ButtonType
  children?: JSX.Element | JSX.Element[] | string
  onClick?: (e?: any) => void
  className?: string
}

export const Button = ({ type, children, onClick, className }: Button) => {
  return (
    <button className={className ? className : type} onClick={onClick}>
      {children}
    </button>
  )
}
