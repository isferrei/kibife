import arrowImg from '../../assets/arrow.svg';

import './style.css';

export function MenuItemAmount({ addItem, removeItem, itemAmount }) {

  return (
    <div className='item-amount'>
      <button type='button' className='add' onClick={addItem}>
        <img src={arrowImg} alt='Adicionar um item' />
      </button>
      <span>{itemAmount}</span>
      <button type='button' className='remove' onClick={removeItem}>
        <img src={arrowImg} alt='Remover um item' />
      </button>
    </div>
  );
}
