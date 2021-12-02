import { useEffect, useState } from 'react';

import { formatPrice, formatSelectedItems } from '../../utils';

import './style.css';

export function OrderTable({ totalPrice, selectedItems }) {
  const [formatedSelItems, setFormatedSelItems] = useState([]);

  useEffect(
    () => setFormatedSelItems(formatSelectedItems(selectedItems)),
    [selectedItems]
  );

  return (
    <table id='order-table'>
      <tbody>
        {formatedSelItems.map((item, i) => (
          <tr key={i}>
            <td>{item.nome}</td>
            <td>{`${item.amount} x R$${formatPrice(item.preco)}`}</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>{`R$${formatPrice(totalPrice)}`}</td>
        </tr>
      </tbody>
    </table>
  );
}
