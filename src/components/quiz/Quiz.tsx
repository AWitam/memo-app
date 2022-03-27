import { useEffect, useState } from 'react'
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
  const [answer, setAnswer] = useState({ message: '', className: '' })
  const [choices, setChoices] = useState<string[]>([''])

  const shuffle = (items: string[]) => items.sort(() => 0.5 - Math.random())

  useEffect(() => {
    setChoices(getChoices())
  }, [currentItem])

  /* 
  renders 2 possible choices if there's less than 4 items in study set,
  otherwise renders 4 possible choices from given study set items definitions
  */
  const getChoices = () => {
    const allDefinitionsInTerms = terms.map((item) => item.definition)
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
      setAnswer({ message: 'Correct!', className: 'correct' })
      setScore(score + 1)
    } else {
      e.target.classList.add('wrong')
      setAnswer({ message: 'Wrong', className: 'wrong' })
    }
    transitionNext(e)
  }

  const next = () => {
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
      setAnswer({ message: '', className: '' })
      next()
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
              <h4>Term:</h4>
              <h4 id="term">{terms[currentItem].term}</h4>
            </div>
            <div className="item__choices">
              <h4>Choose matching definition:</h4>
              <span className={`answer ${answer.className}`}>{answer.message}</span>
              <div className="choices__container">
                {choices.map((choice) => (
                  <div key={choice} onClick={(e) => checkAnswer(e)} className="item__choice" data-choice={choice}>
                    {choice}
                  </div>
                ))}
              </div>
            </div>
            <span id="quiz__progress">{`${currentItem + 1} / ${terms.length}`}</span>
          </>
        )}
      </div>
    </div>
  )
}
