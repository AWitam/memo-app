import { useEffect, useState } from 'react'
import { InputGroupProps } from '../types'

export const InputGroup = ({ field, updateField }: InputGroupProps) => {
  const { id, term, definition } = field

  const [termValue, setTermValue] = useState(term)
  const [definitionValue, setDescriptionValue] = useState(definition)

  useEffect(() => {
    updateField(id, termValue, definitionValue)
  }, [termValue, definitionValue])

  return (
    <div>
      <input type="text" name="term" value={termValue} onChange={(e) => setTermValue(e.target.value)} />
      <input
        type="text"
        name="definition"
        value={definitionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />
    </div>
  )
}
