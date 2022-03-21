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
  disabled?: boolean
}

export const Button = ({
  type,
  children,
  onClick,
  className,
  disabled,
}: Button) => {
  return (
    <button
      disabled={disabled ? true : false}
      className={className ? className : type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
