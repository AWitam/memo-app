import { useEffect, useState } from 'react';
import { InputGroupProps } from '../types';
import { ReactComponent as TrashIcons } from '../../assets/icons/trash.svg';

export const InputGroup = ({ field, updateField, onDelete, count }: InputGroupProps) => {
  const { id, term, definition } = field;

  const [termValue, setTermValue] = useState(term);
  const [definitionValue, setDescriptionValue] = useState(definition);

  useEffect(() => {
    updateField(id, termValue, definitionValue);
  }, [termValue, definitionValue]);

  return (
    <div className="item">
      <div className="item__header">
        <span>{count + 1}</span>
        <TrashIcons onClick={() => onDelete(id)} />
      </div>
      <div className="item__content">
        <input
          type="text"
          placeholder="term"
          name="term"
          autoComplete="off"
          value={termValue}
          onChange={(e) => setTermValue(e.target.value)}
        />
        <input
          type="text"
          name="definition"
          autoComplete="off"
          placeholder="definition"
          value={definitionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
      </div>
    </div>
  );
};
