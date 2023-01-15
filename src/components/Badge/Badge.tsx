import './badge.scss';

interface BadgeProps {
  icon?: JSX.Element
  content: string | number;
}

export const Badge = ({ icon, content }: BadgeProps) => {
  return (
    <div className="badge">
      {icon}
      <span>{content}</span>
    </div>
  );
};
