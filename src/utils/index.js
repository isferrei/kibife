function formatPrice(price) {
  if (price) {
    return price.toFixed(2).split('.').join(',');
  } else {
    return 0
  }
}

function formatSelectedItems(selectedItems) {
  const uniqueItems = [];

  selectedItems.forEach((item) => {
    const amount = uniqueItems.filter(
      (sitem) => sitem.nome === item.nome
    ).length;

    if (!amount) {
      uniqueItems.push(item);
    }
  });

  const formatedSelItems = [];

  uniqueItems.forEach((item) => {
    const amount = selectedItems.filter(
      (sitem) => sitem.nome === item.nome
    ).length;

    formatedSelItems.push({ ...item, amount });
  });

  return formatedSelItems;
}

export { formatPrice, formatSelectedItems };
