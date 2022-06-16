import { useState } from 'react';
import './MarkInput.css';

type Props = {
  value: number | string;
  setValue: (value: number | string) => void;
}

export const MarkInput: React.FC<Props> = ({ value, setValue }) => {
  const [error, setError] = useState<string | null>(null);

  const validateChange = () => {
    const valide = value === 'н' 
      || (Number(value) >= 1 && Number(value) <= 12)
      || String(value).trim().length === 0
      || !value;

    if (!valide) {
      setError('некоректні дані');
    }
  }
  
  return (
    <div className="MarkInput__wrapper">
      <input
        type="text"
        name="mark"
        value={value || ''}
        onChange={(event) => {
          setValue(Number(+event.target.value) 
          ? (+event.target.value)
          : (event.target.value))
          setError(null);
        }}
        className="MarkInput__input"
        onBlur={validateChange}
      />
      <p className="MarkInput__error">{error}</p>
    </div>
  )
}