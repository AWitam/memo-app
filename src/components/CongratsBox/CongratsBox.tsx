import { Button, ButtonType } from '../Button/Button';
import { ReactComponent as RepeatIcon } from '../../assets/icons/repeat.svg';
import './congratsBox.scss';

interface CongratsBox {
  numberOfTerms: number;
  score?: number;
  finish: () => void;
  repeat: () => void;
}

export const CongratsBox: React.FC<CongratsBox> = (props) => {
  const { numberOfTerms, score, finish, repeat } = props;
  return (
    <div className="congrats__box">
      <h4>Congratulations 🎉</h4>
      {!score && <p>You just studied {numberOfTerms} terms!</p>}

      {(score || score == 0) && (
        <p>
          You answered correctly on {score} / {numberOfTerms} terms!
        </p>
      )}
      <div className="finish-actions">
        <Button type={ButtonType.secondary} onClick={repeat}>
          <RepeatIcon />
          <span>Study again</span>
        </Button>
        <Button type={ButtonType.primary} onClick={finish}>
          Finish
        </Button>
      </div>
    </div>
  );
};
