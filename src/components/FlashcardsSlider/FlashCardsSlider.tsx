import React, { useEffect, useRef, useState } from 'react';
import { TermItem } from '../../common/types';
import { Button } from '../Button/Button';
import { ReactComponent as PreviousIcon } from '../../assets/icons/long-left.svg';
import { ReactComponent as NextIcon } from '../../assets/icons/long-right.svg';
import './flashCardsSlider.scss';
import { CongratsBox } from '../CongratsBox/CongratsBox';

interface FlashCardsSliderProps {
  terms: TermItem[];
  finish: () => void;
}

export const FlashCardsSlider = (props: FlashCardsSliderProps) => {
  const { terms, finish } = props;
  const flashCardBody = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  // todo extract swipe logic to separate hook
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const flip = () => {
    if (flashCardBody.current) {
      flashCardBody.current.style.transition = 'transform 0.8s';
      !showCongrats && flashCardBody.current.classList.toggle('flipped');
    }
  };

  const prev = () => {
    if (currentIndex !== 0 && flashCardBody.current) {
      flashCardBody.current.classList.add('slide-prev');
    }
    preventTransition();
    if (showCongrats) {
      setShowCongrats(false);
      return;
    }

    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex !== terms.length - 1 && flashCardBody.current) {
      flashCardBody.current.classList.add('slide-next');
    }
    preventTransition();
    if (currentIndex === terms.length - 1) {
      setShowCongrats(true);
    } else {
      setShowCongrats(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const preventTransition = () => {
    if (flashCardBody.current) {
      flashCardBody.current.style.transition = 'none';
      flashCardBody.current.classList.remove('flipped');
    }
  };

  const repeat = () => {
    preventTransition();
    setShowCongrats(false);
    setCurrentIndex(0);
  };

  const handleTouchStart = (e: any) => {
    setTouchStart(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e: any) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      setTouchEnd(e.changedTouches[0].clientX);
    }
  };

  useEffect(() => {
    if (flashCardBody.current) {
      flashCardBody.current.addEventListener('touchstart', handleTouchStart);
      flashCardBody.current.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (flashCardBody.current) {
        flashCardBody.current.removeEventListener('touchstart', handleTouchStart);
        flashCardBody.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [flashCardBody]);

  useEffect(() => {
    if (Math.abs(touchEnd - touchStart) > 5) {
      if (touchEnd > touchStart) {
        prev();
      } else {
        next();
      }
    }
  }, [touchEnd]);

  const removeClass = () => {
    if (flashCardBody.current) {
      flashCardBody.current.classList.remove('slide-next');
      flashCardBody.current.classList.remove('slide-prev');
    }
  };

  return (
    <div className="slider">
      <div className="flashcard__container">
        <div ref={flashCardBody} className="flashcard__body" onClick={flip} onAnimationEnd={removeClass}>
          {showCongrats ? (
            <CongratsBox numberOfTerms={terms.length} finish={finish} repeat={repeat} />
          ) : (
            <>
              <div className="flashcard__body--front">{terms[currentIndex].term}</div>
              <div className="flashcard__body--back">{terms[currentIndex].definition}</div>
            </>
          )}
        </div>
        <div className="slider__controls">
          <Button disabled={terms.length === 1 || currentIndex === 0} onClick={prev}>
            <PreviousIcon />
          </Button>
          {`${currentIndex + 1} / ${terms.length}`}
          <Button disabled={showCongrats} onClick={next}>
            <NextIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
