const idOrder = document.querySelector("#id");
const nameClient = document.querySelector("#name");
const valueOder = document.querySelector("#value");
const quantityOrder = document.querySelector("#quantity");
const productsContainer = document.querySelector("#tbodyOrder");

export const emptyValue = () => {
  idOrder.value = "";
  nameClient.value = "";
  valueOder.value = "";
  quantityOrder.value = "";
  productsContainer.innerHTML = "";
};

export const getInputValue = () => {
  const trAll = productsContainer.querySelectorAll("tr");

  return {
    id: +idOrder.value,
    name: nameClient.value,
    value: valueOder.value,
    quantity: quantityOrder.value,
    products: Array.from(trAll).map((item) => {
      return {
        productId: item.querySelector("input").value,
        quantity: item.querySelector("td input").value,
      };
    }),
  };
};

export const setValueInput = (data) => {
  idOrder.value = data.id;
  nameClient.value = data.name;
  valueOder.value = data.value;
  quantityOrder.value = data.quantity;
};
