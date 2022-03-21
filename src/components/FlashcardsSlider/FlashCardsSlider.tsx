import { useEffect, useRef, useState } from 'react'
import { FlashCardField } from '../../common/types'
import { Button, ButtonType } from '../Button/Button'
import { ReactComponent as PreviousIcon } from '../../assets/icons/long-left.svg'
import { ReactComponent as NextIcon } from '../../assets/icons/long-right.svg'
import { ReactComponent as RepeatIcon } from '../../assets/icons/repeat.svg'
import './flashCardsSlider.scss'

interface FlashCardsSliderProps {
  terms: FlashCardField[]
  finish: () => void
}

export const FlashCardsSlider = (props: FlashCardsSliderProps) => {
  const { terms, finish } = props
  const flashCardBody = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCongrats, setShowCongrats] = useState(false)

  // todo extract swipe logic to separate hook
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const flip = () => {
    if (flashCardBody.current) {
      flashCardBody.current.style.transition = 'transform 0.8s'
      !showCongrats && flashCardBody.current.classList.toggle('flipped')
    }
  }

  const prev = () => {
    if (currentIndex !== 0 && flashCardBody.current) {
      flashCardBody.current.classList.add('slide-prev')
    }
    preventTransition()
    if (showCongrats) {
      setShowCongrats(false)
      return
    }

    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const next = () => {
    if (currentIndex !== terms.length - 1 && flashCardBody.current) {
      flashCardBody.current.classList.add('slide-next')
    }
    preventTransition()
    if (currentIndex === terms.length - 1) {
      setShowCongrats(true)
    } else {
      setShowCongrats(false)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const preventTransition = () => {
    if (flashCardBody.current) {
      flashCardBody.current.style.transition = 'none'
      flashCardBody.current.classList.remove('flipped')
    }
  }

  const repeat = () => {
    preventTransition()
    setShowCongrats(false)
    setCurrentIndex(0)
  }

  const handleTouchStart = (e: any) => {
    setTouchStart(e.changedTouches[0].clientX)
  }

  const handleTouchEnd = (e: any) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      setTouchEnd(e.changedTouches[0].clientX)
    }
  }

  useEffect(() => {
    if (flashCardBody.current) {
      flashCardBody.current.addEventListener('touchstart', handleTouchStart)
      flashCardBody.current.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (flashCardBody.current) {
        flashCardBody.current.removeEventListener(
          'touchstart',
          handleTouchStart
        )
        flashCardBody.current.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [flashCardBody])

  useEffect(() => {
    if (Math.abs(touchEnd - touchStart) > 5) {
      if (touchEnd > touchStart) {
        prev()
      } else {
        next()
      }
    }
  }, [touchEnd])

  const removeClass = () => {
    if (flashCardBody.current) {
      flashCardBody.current.classList.remove('slide-next')
      flashCardBody.current.classList.remove('slide-prev')
    }
  }

  return (
    <div className="slider">
      <div className="flashcard__container">
        <div
          ref={flashCardBody}
          className="flashcard__body"
          onClick={flip}
          onAnimationEnd={removeClass}
        >
          {showCongrats ? (
            <CongratsFlashcard
              numberOfTerms={terms.length}
              finish={finish}
              repeat={repeat}
            />
          ) : (
            <>
              <div className="flashcard__body--front">
                {terms[currentIndex].term}
              </div>
              <div className="flashcard__body--back">
                {terms[currentIndex].definition}
              </div>
            </>
          )}
        </div>
        <div className="slider__controls">
          <Button
            disabled={terms.length === 1 || currentIndex === 0}
            onClick={prev}
          >
            <PreviousIcon />
          </Button>
          {`${currentIndex + 1} / ${terms.length}`}
          <Button disabled={showCongrats} onClick={next}>
            <NextIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface CongratsFlashCard {
  numberOfTerms: number
  finish: () => void
  repeat: () => void
}

const CongratsFlashcard = (props: CongratsFlashCard) => {
  const { numberOfTerms, finish, repeat } = props
  return (
    <div className="flashcard__body--congrats">
      <h5>Congratulations 🎉</h5>
      <p>
        You just studied {numberOfTerms} {numberOfTerms >= 2 ? 'terms' : 'term'}
        !
      </p>
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
  )
}