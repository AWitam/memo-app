import { useState } from 'react'
import { TermItem } from '../../common/types'
import { CongratsBox } from '../CongrarsBox/CongratsBox'
import './quiz.scss'

interface QuizProps {
  terms: TermItem[]
  finish: () => void
}

export const Quiz = (props: QuizProps) => {
  const { terms, finish } = props
  const [currentItem, setCurrentItem] = useState(0)
  const [score, setScore] = useState(0)
  const [showCongrats, setShowCongrats] = useState(false)
  const [UIMessage, setUIMessage] = useState('')
  const allDefinitionsInTerms = terms.map((item) => item.definition)

  const shuffle = (items: string[]) => items.sort(() => 0.5 - Math.random())

  /* 
  renders 2 possible choices if there's less than 4 items in study set,
  otherwise renders 4 possible choices from given study set items definitions
  */
  const getChoices = () => {
    const amount = terms.length <= 4 ? 1 : 3
    const correctAnswer = terms[currentItem].definition
    const shuffledAllPossibleChoices = shuffle(
      allDefinitionsInTerms.filter((definition) => definition !== correctAnswer)
    )

    const narrowToAmount = shuffledAllPossibleChoices.slice(0, amount)
    return shuffle([...narrowToAmount, correctAnswer])
  }

  const checkAnswer = (e: any) => {
    const userChoice = e.target.getAttribute('data-choice')
    if (userChoice === terms[currentItem].definition) {
      e.target.classList.add('correct')
      setUIMessage('Correct!')
      setScore(score + 1)
      transitionNext(e)
    } else {
      e.target.classList.add('wrong')
      setUIMessage('Wrong')
      transitionNext(e)
    }
  }

  const next = (e: any) => {
    if (currentItem !== terms.length - 1) {
      setCurrentItem(currentItem + 1)
    } else {
      setShowCongrats(true)
    }
  }

  const transitionNext = (e: any) => {
    setTimeout(() => {
      e.target.classList.remove('correct')
      e.target.classList.remove('wrong')
      setUIMessage('')
      next(e)
    }, 1000)
  }

  const handleRepeat = () => {
    setShowCongrats(false)
    setCurrentItem(0)
    setScore(0)
  }

  return (
    <div className="quiz">
      <div className="quiz__container">
        {showCongrats ? (
          <CongratsBox numberOfTerms={terms.length} finish={finish} repeat={handleRepeat} score={score} />
        ) : (
          <>
            <div className="item__term">
              <h5>Term:</h5>
              {terms[currentItem].term}
            </div>
            <div className="item__choices">
              <h5>Choose matching definition:</h5>
              {UIMessage}
              <div className="choices__container">
                {getChoices().map((choice) => (
                  <div key={choice} onClick={(e) => checkAnswer(e)} className="item__choice" data-choice={choice}>
                    {choice}
                  </div>
                ))}
              </div>
              {`${currentItem + 1} / ${terms.length}`}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
