import { formatPrice } from "../utils/formatPrice.js";

const quantityInput = document.querySelector("#quantity");
const valueInput = document.querySelector("#value");

let valueArr = [];
let quantityArr = [];

const reduce = (value, fixed) =>
  value.reduce((acc, curr) => acc + curr, 0).toFixed(fixed);

const multiply = (mult, price) =>
  Number(mult) * Number(price.replace(",", "."));

const controlQty = (e, el, n, td, price) => {
  const index = e.target.getAttribute("data-index");
  let value = +el.value;
  const min = +el.min;
  const max = +el.max;

  if ((n < 0 && value > 1) || (n > 0) & (value < max)) {
    el.value = value + n;
    td.innerHTML = formatPrice(value + n, price);
    valueArr[+index] = multiply(value + n, price);
    quantityArr[+index] = value + n;
    quantityInput.value = reduce(quantityArr, 0);
    valueInput.value = reduce(valueArr, 2);
  }
};

export const trOrder = (data) => {
  // console.log(data);
  const product = data.data.products.filter(
    (item) => item.productId === data.id
  )[0];
  console.log(product);
  const tr = document.createElement("tr");

  const idTd = document.createElement("td");
  idTd.innerHTML = data.id;
  tr.appendChild(idTd);

  const nameTd = document.createElement("td");
  nameTd.innerHTML = data.name;
  tr.appendChild(nameTd);

  const priceTd = document.createElement("td");
  priceTd.innerHTML = data.price;
  tr.appendChild(priceTd);

  const inputHidden = document.createElement("input");
  inputHidden.type = "hidden";
  inputHidden.value = data.id;
  inputHidden.name = "product";
  tr.appendChild(inputHidden);

  const inputTD = document.createElement("td");
  inputTD.style.padding = 0;
  const buttonMinor = document.createElement("button");

  buttonMinor.classList.add("control-quantity");
  buttonMinor.innerHTML = "-";
  inputTD.appendChild(buttonMinor);

  const input = document.createElement("input");

  input.classList.add("quantity");
  input.min = 1;
  input.max = data.stock;
  input.value = product.quantity;
  input.name = "quantity";
  input.type = "number";
  inputTD.appendChild(input);

  quantityArr.push(+input.value);
  quantityInput.value = reduce(quantityArr, 0);
  valueArr.push(+input.value * Number(data.price.replace(",", ".")));
  valueInput.value = reduce(valueArr, 2);

  const buttonPlus = document.createElement("button");
  buttonPlus.classList.add("control-quantity");
  buttonPlus.innerHTML = "+";

  inputTD.appendChild(buttonPlus);

  tr.appendChild(inputTD);

  const valueTd = document.createElement("td");
  valueTd.innerHTML = formatPrice(input.value, data.price);

  buttonMinor.setAttribute("data-index", quantityArr.length - 1);
  buttonMinor.addEventListener("click", (e) =>
    controlQty(e, input, -1, valueTd, data.price, quantityArr.length - 1)
  );

  buttonPlus.setAttribute("data-index", quantityArr.length - 1);
  buttonPlus.addEventListener("click", (e) =>
    controlQty(e, input, 1, valueTd, data.price)
  );

  tr.appendChild(valueTd);

  return tr;
};
