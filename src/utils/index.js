function formatPrice(price) {
  console.log(price);
  return price.toFixed(2).split('.').join(',');
}

function formatSelectedItems(selectedItems) {
  const uniqueItems = [];

  selectedItems.forEach(item => {
    const amount = uniqueItems.filter(sitem => sitem.name === item.name).length;

    if (!amount) {
      uniqueItems.push(item);
    }
  });

  const formatedSelItems = [];

  uniqueItems.forEach(item => {
    const amount = selectedItems.filter(sitem => sitem.name === item.name).length;

    formatedSelItems.push({ ...item, amount });
  });

  return formatedSelItems;
}

export { formatPrice, formatSelectedItems };