import { useState } from 'react';
import * as S from './styles';
import './style.css';

export function MenuItem({
  name,
  image,
  price,
  description,
  onSelect,
  onDeselect,
}) {
  const [selected, setSelected] = useState(false);

  function handleMenuItemClick() {
    if (selected) {
      onDeselect();
    } else {
      onSelect();
    }

    setSelected(!selected);
  }

  return (
    <div
      className={`menuItem ${selected ? 'selected' : ''}`}
      onClick={handleMenuItemClick}
    >
      <S.MenuItem>
        {image !== '' && <img src={image} alt={name} width='50px' />}
        <S.Content>
          <header>
            <h2>{name}</h2>
            <span>{`R$${price}`}</span>
          </header>
          {description && <p>{description}</p>}
        </S.Content>
      </S.MenuItem>
    </div>
  );
}
