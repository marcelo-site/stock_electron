const nameClient = document.querySelector("#name");
const valueOder = document.querySelector("#value");
const quantityOrder = document.querySelector("#quantity");
// const productsContainer = document.querySelector("#products");
const tbodyOrder = document.querySelector("#tbodyOrder");

export const emptyValue = () => {
  nameClient.value = "";
  valueOder.value = "";
  quantityOrder.value = "";
  tbodyOrder.innerHTML = "";
};

export const getInputValue = () => {
  const products = document.querySelectorAll('input[name="product"]');
  const quantity = document.querySelectorAll('input[name="quantity"]');
  return {
    name: nameClient.value,
    value: valueOder.value,
    quantity: quantityOrder.value,
    products: Array.from(products).map((item, i) => {
      return {
        productId: item.value,
        quantity: quantity[i].value,
      };
    }),
  };
};

export const setValueInput = (data) => {
  nameClient.value = data.name;
  valueOder.value = data.value;
  quantityOrder.value = data.quantity;
  // data.products.map((item) => {
  //   const input = document.createElement("input");
  //   input.value = item;
  //   productsContainer.appendChild(input);
  // });
};

// export { productsContainer };
