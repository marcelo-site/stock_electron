const idProdcut = document.querySelector("#id");
const nameProduct = document.querySelector("#name");
const priceProduct = document.querySelector("#price");
const stockProduct = document.querySelector("#stock");

export const emptyValue = () => {
  idProdcut.value = "";
  idProdcut.removeAttribute("readonly");
  nameProduct.value = "";
  priceProduct.value = "";
  stockProduct.value = "";
};

export const getInputValue = (readonly) => {
  if (readonly) {
    idProdcut.setAttribute("readonly", true);
  } else {
    idProdcut.removeAttribute("readonly");
  }
  return {
    id: idProdcut.value,
    name: nameProduct.value,
    price: priceProduct.value,
    stock: stockProduct.value,
  };
};

export const setValueInput = (data) => {
  idProdcut.value = data.id;
  idProdcut.setAttribute("readonly", true);
  nameProduct.value = data.name;
  priceProduct.value = data.price;
  stockProduct.value = data.stock;
};
