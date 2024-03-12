const nameClient = document.querySelector("#name");
const valueOder = document.querySelector("#value");
const quantityOrder = document.querySelector("#quantity");
const productsContainer = document.querySelector("#products");
// const products = document.querySelector('input[name="product"]');

export const emptyValue = () => {
  nameClient.value = "";
  valueOder.value = "";
  quantityOrder.value = "";
  productsContainer.innerHTML = "";
};

export const getInputValue = () => {
  return {
    name: nameClient.value,
    price: valueOder.value,
    stock: quantityOrder.value,
    // products: Array.from(products).map((item) => item.value),
  };
};

export const setValueInput = (data) => {
  console.log(data);
  nameClient.value = data.name;
  valueOder.value = data.value;
  quantityOrder.value = data.quantity;
  // data.products.map((item) => {
  //   const input = document.createElement("input");
  //   input.value = item;
  //   productsContainer.appendChild(input);
  // });
};
