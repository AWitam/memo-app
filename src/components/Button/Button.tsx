import './button.scss';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface Button {
  type?: ButtonType;
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (e?: any) => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<Button> = (props) => {
  const { type, children, onClick, className, disabled } = props;
  return (
    <button disabled={disabled ? true : false} className={className ? className : type} onClick={onClick}>
      {children}
    </button>
  );
};
