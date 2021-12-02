import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useQuerySubscription } from 'react-datocms';

import { MenuItem } from './components/MenuItem';
import { MenuItemAmount } from './components/MenuItemAmount';
import { OrderTable } from './components/OrderTable';

import { formatPrice, formatSelectedItems } from './utils';

import logo from './assets/logo.png';

import './styles/global.css';
import './styles/App.css';
import * as S from './styles/styles';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [bairro, setBairro] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data } = useQuerySubscription({
    enabled: true,
    query: `
      query AppQuery($first: IntType) {
        aves: allAves (first: $first) {
          id
          nome
          preco
         descricao
         foto{
           id
           url
         }
        },
        bovinos: allBovinos (first: $first) {
          id
          nome
          preco
         descricao
         foto{
           id
           url
         }
        },
        suinos: allSuinos (first: $first) {
          id
          nome
          preco
         descricao
         foto{
           id
           url
         }
        },
        fretes: allFretes (first: $first) {
         label
         value
        }
        
      }`,
    variables: { first: 10 },
    token: '3d06b10bb86809c9273f9eee5d6bd0',
  });

  const aves = data ? data.aves : [];
  const suinos = data ? data.suinos : [];
  const bovinos = data ? data.bovinos : [];
  const options = data ? data.fretes : [];

  function onDeselectItem(item) {
    setSelectedItems((arr) => arr.filter((value) => value !== item));
  }

  function addItem(item) {
    setSelectedItems((arr) => [...arr, item]);
  }

  function removeItem(item) {
    const itemAmount = selectedItems.filter(
      (sitem) => sitem.name === item.name
    ).length;

    if (itemAmount > 1) {
      const i = selectedItems.indexOf(item);
      const nSelectedItems = [...selectedItems];

      nSelectedItems.splice(i, 1);

      setSelectedItems(nSelectedItems);
    }
  }

  function makeOrder() {
    if (totalPrice === 0 || selectedValue === 1) {
      return;
    }
    let message = '';
    const formatedSelItems = formatSelectedItems(selectedItems);
    var endereco = prompt('Por gentileza, informe a rua para entrega:');
    formatedSelItems.forEach(
      (item) =>
        (message += `${item.nome} - ${item.amount} x R$${formatPrice(
          item.preco
        )}\n`)
    );
    message += `Total - R$${formatPrice(valorfinal)}\n\n`;
    message += `Endereço: ` + endereco + ', ';

    message += bairro + `\n\n`;

    if (frete === 0) {
      message += `Valor do frete: A calcular`;
    } else message += `Valor do frete: R$` + frete + `,00`;

    window
      .open(
        `https://wa.me/553230265038/?text=${window.encodeURIComponent(
          message
        )}`,
        '_blank'
      )
      .focus();
  }

  useEffect(() => {
    function calcTotalPrice() {
      let nTotalPrice = 0;

      selectedItems.forEach((item) => {
        let price = item.preco;

        nTotalPrice += price;
      });

      setTotalPrice(nTotalPrice);
    }

    calcTotalPrice();
  }, [selectedItems]);

  const [selectedValue, setSelectedValue] = useState(0.1);
  const handleChange = (e) => {
    setSelectedValue(e.value);
    setBairro(e.label);
  };

  console.log(bairro);

  var frete = 0;
  var freteexibir = 0;

  if (typeof selectedValue === 'string') {
    frete = 0;
    freteexibir = 'A calcular';
  } else {
    frete = Math.round(selectedValue);
    freteexibir = 'R$' + frete + ',00';
  }

  var valorfinal = totalPrice + frete;

  console.log(options);

  return (
    <div id='app'>
      <img src={logo} alt='Logo' />
      <header>
        <h1>Faça seus pedidos!</h1>
        <p>
          Clique nos ítens para seleciona-los, adicione a quantidade desejada e
          seu endereço. Finalizaremos seu pedido via WhatsApp!
        </p>
      </header>
      <main>
        <section id='menu'>
          <section id='aves'>
            <h1>Aves</h1>
            {aves.map((ave, i) => (
              <div className='item-container' key={i}>
                <MenuItem
                  image={ave.foto?.url ? ave.foto.url : ''}
                  name={ave.nome}
                  price={formatPrice(ave.preco)}
                  description={ave.descricao}
                  onSelect={() => setSelectedItems((arr) => [...arr, ave])}
                  onDeselect={() => onDeselectItem(ave)}
                />
                {selectedItems.includes(ave) && (
                  <MenuItemAmount
                    addItem={() => addItem(ave)}
                    removeItem={() => removeItem(ave)}
                    itemAmount={
                      selectedItems.filter((item) => item.nome === ave.nome)
                        .length
                    }
                  />
                )}
              </div>
            ))}
          </section>
          <section id='bovinos'>
            <h1>Bovinos</h1>
            {bovinos?.map((bovino, i) => (
              <div className='item-container' key={i}>
                <MenuItem
                  image={bovino.foto?.url ? bovino.foto.url : ''}
                  name={bovino.nome}
                  price={formatPrice(bovino.preco)}
                  description={bovino.descricao}
                  onSelect={() => setSelectedItems((arr) => [...arr, bovino])}
                  onDeselect={() => onDeselectItem(bovino)}
                />
                {selectedItems.includes(bovino) && (
                  <MenuItemAmount
                    addItem={() => addItem(bovino)}
                    removeItem={() => removeItem(bovino)}
                    itemAmount={
                      selectedItems.filter((item) => item.nome === bovino.nome)
                        .length
                    }
                  />
                )}
              </div>
            ))}
          </section>
          <section id='suinos'>
            <h1>Suinos</h1>
            {suinos.map((suino, i) => (
              <div className='item-container' key={i}>
                <MenuItem
                  image={suino.foto?.url ? suino.foto.url : ''}
                  name={suino.nome}
                  price={formatPrice(suino.preco)}
                  description={suino.descricao}
                  onSelect={() => setSelectedItems((arr) => [...arr, suino])}
                  onDeselect={() => onDeselectItem(suino)}
                />
                {selectedItems.includes(suino) && (
                  <MenuItemAmount
                    addItem={() => addItem(suino)}
                    removeItem={() => removeItem(suino)}
                    itemAmount={
                      selectedItems.filter((item) => item.nome === suino.nome)
                        .length
                    }
                  />
                )}
              </div>
            ))}
          </section>
        </section>
        {totalPrice > 0 && (
          <OrderTable totalPrice={valorfinal} selectedItems={selectedItems} />
        )}
        <section id='sale'>
          <div>
            <span>
              * Se seu bairro não estiver listado, pedimos por gentileza para
              prosseguir com seu pedido e o valor do frete lhe será informado
              assim que prosseguirmos via WhatsApp.{' '}
            </span>
          </div>
        </section>
        <S.Select>
          <CreatableSelect
            isClearable={false}
            placeholder='Selecione seu bairro...'
            value={options.find((obj) => obj.value === selectedValue)} // set selected value
            options={options} // set list of the data
            onChange={handleChange} // assign onChange function
            styles={{ color: '#000' }}
          />
        </S.Select>

        {selectedValue && (
          <div style={{ marginTop: 20, lineHeight: '25px' }}>
            <div>
              <b>Valor do frete: {freteexibir}</b>
            </div>
          </div>
        )}

        <button
          id='order'
          type='button'
          disabled={totalPrice > 0 ? false : true}
          onClick={makeOrder}
        >
          Fazer pedido
        </button>
      </main>
    </div>
  );
}

export default App;
