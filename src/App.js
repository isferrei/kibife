import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useQuerySubscription } from 'react-datocms';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import { MenuItem } from './components/MenuItem';
import { MenuItemAmount } from './components/MenuItemAmount';
import { OrderTable } from './components/OrderTable';

import { formatPrice, formatSelectedItems } from './utils';

import logo from './assets/logo.png';

import './styles/global.css';
import './styles/App.css';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [categorias, setCategorias] = useState([]);
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
         bairro
         valor
        }
        
      }`,
    variables: { first: 10 },
    token: '3d06b10bb86809c9273f9eee5d6bd0',
  });

  const aves = data ? data.aves : [];
  const suinos = data ? data.suinos : [];
  const bovinos = data ? data.bovinos : [];
  const options = data
    ? [{ value: 0.1, label: 'Selecione seu bairro...' }, data.fretes]
    : [];

  console.log(suinos);

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
    if (totalPrice === 0 || selectedValue == 1) {
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

    var bairro;

    if (selectedValue == 12) {
      bairro = 'Aeroporto';
    } else if (selectedValue == 10.1) {
      bairro = 'Alto dos passos';
    } else if (selectedValue == 25) {
      bairro = 'Alphaville';
    } else if (selectedValue == 15.1) {
      bairro = 'Bandeirantes';
    } else if (selectedValue == 15.2) {
      bairro = 'Bom clima';
    } else if (selectedValue == 15.3) {
      bairro = 'Bom pastor';
    } else if (selectedValue == 15.4) {
      bairro = 'Bosque do imperador';
    } else if (selectedValue == 15.12) {
      bairro = 'Bosque dos pinheiros';
    } else if (selectedValue == 15.13) {
      bairro = 'Bosque imperial';
    } else if (selectedValue == 10.2) {
      bairro = 'Cascatinha';
    } else if (selectedValue == 10.3) {
      bairro = 'Centro';
    } else if (selectedValue == 10.4) {
      bairro = 'Costa Carvalho';
    } else if (selectedValue == 10.12) {
      bairro = 'Dom Bosco';
    } else if (selectedValue == 10.13) {
      bairro = 'Estrela Sul';
    } else if (selectedValue == 10.14) {
      bairro = 'Granbery';
    } else if (selectedValue == 15.14) {
      bairro = 'Granville';
    } else if (selectedValue == 10.33) {
      bairro = 'Jardim Glória';
    } else if (selectedValue == 10.155) {
      bairro = 'Jardim Laranjeiras';
    } else if (selectedValue == 10.144) {
      bairro = 'Poço Rico';
    } else if (selectedValue == 15.15) {
      bairro = 'Portal da Torre';
    } else if (selectedValue == 15.155) {
      bairro = 'Portal do Aeroporto';
    } else if (selectedValue == 15.16) {
      bairro = 'Quintas da Avenida';
    } else if (selectedValue == 15.17) {
      bairro = 'Salvaterra';
    } else if (selectedValue == 10.15) {
      bairro = 'Santa Helena';
    } else if (selectedValue == 10.16) {
      bairro = 'Santa Luzia';
    } else if (selectedValue == 10.17) {
      bairro = 'São Mateus';
    } else if (selectedValue == 10.18) {
      bairro = 'Sâo Pedro';
    } else if (selectedValue == 15.18) {
      bairro = 'Spina Ville';
    } else if (selectedValue == 10.19) {
      bairro = 'Teixeiras';
    } else if (selectedValue == 15.19) {
      bairro = 'Vale do Ipê';
    } else bairro = selectedValue;

    message += bairro + `\n\n`;

    if (frete == 0) {
      message += `Valor do frete: A calcular`;
    } else message += `Valor do frete: R$` + frete + `,00`;

    window
      .open(
        `https://wa.me/5532998402901/?text=${window.encodeURIComponent(
          message
        )}`,
        '_blank'
      )
      .focus();
  }

  useEffect(() => {
    function calcTotalPrice() {
      let nTotalPrice = 0;

      const aves = selectedItems;

      console.log(selectedItems);
      selectedItems.forEach((item) => {
        let price = item.preco;

        nTotalPrice += price;
      });

      setTotalPrice(nTotalPrice);
    }

    calcTotalPrice();
  }, [selectedItems]);

  console.log(totalPrice);

  const [selectedValue, setSelectedValue] = useState(0.1);
  const handleChange = (e) => {
    setSelectedValue(e.value);
  };

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
  return (
    <div id='app'>
      <img src={logo} />
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
            {aves.map((produto, i) => (
              <div className='item-container' key={i}>
                <MenuItem
                  image={produto.foto?.url ? produto.foto.url : ''}
                  name={produto.nome}
                  price={formatPrice(produto.preco)}
                  description={produto.descricao}
                  onSelect={() => setSelectedItems((arr) => [...arr, produto])}
                  onDeselect={() => onDeselectItem(produto)}
                />
                {selectedItems.includes(produto) && (
                  <MenuItemAmount
                    addItem={() => addItem(produto)}
                    removeItem={() => removeItem(produto)}
                    itemAmount={
                      selectedItems.filter((item) => item.nome === produto.nome)
                        .length
                    }
                  />
                )}
              </div>
            ))}
          </section>
          <section id='bovinos'>
            <h1>Bovinos</h1>
            {bovinos?.map((produto, i) => (
              <div className='item-container' key={i}>
                <MenuItem
                  image={produto.foto?.url ? produto.foto.url : ''}
                  name={produto.nome}
                  price={formatPrice(produto.preco)}
                  description={produto.descricao}
                  onSelect={() => setSelectedItems((arr) => [...arr, produto])}
                  onDeselect={() => onDeselectItem(produto)}
                />
                {selectedItems.includes(produto) && (
                  <MenuItemAmount
                    addItem={() => addItem(produto)}
                    removeItem={() => removeItem(produto)}
                    itemAmount={
                      selectedItems.filter((item) => item.nome === produto.nome)
                        .length
                    }
                  />
                )}
              </div>
            ))}
          </section>
          <section id='suinos'>
            <h1>Suinos</h1>
            {suinos.map((produto, i) => (
              <div className='item-container' key={i}>
                <MenuItem
                  image={produto.foto?.url ? produto.foto.url : ''}
                  name={produto.nome}
                  price={formatPrice(produto.preco)}
                  description={produto.descricao}
                  onSelect={() => setSelectedItems((arr) => [...arr, produto])}
                  onDeselect={() => onDeselectItem(produto)}
                />
                {selectedItems.includes(produto) && (
                  <MenuItemAmount
                    addItem={() => addItem(produto)}
                    removeItem={() => removeItem(produto)}
                    itemAmount={
                      selectedItems.filter((item) => item.nome === produto.nome)
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
        <CreatableSelect
          isClearable={false}
          placeholder='Selecione seu bairro...'
          value={options.find((obj) => obj.value === selectedValue)} // set selected value
          options={options} // set list of the data
          onChange={handleChange} // assign onChange function
        />

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
