import { formatPrice } from "../utils/formatPrice.js";
import { appendElement, createElementSimple } from "../utils/Element.js";
import { controlModal } from "./modal.js";

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
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", data.id);

  const tdId = createElementSimple("td", data.id);
  // tdId.setAttribute("data-id", data.id);
  tr.appendChild(tdId);

  appendElement(tr, "td", data.name);
  appendElement(tr, "td", data.price);

  const inputHidden = document.createElement("input");
  inputHidden.type = "hidden";
  inputHidden.value = data.id;
  inputHidden.name = "product";
  tr.appendChild(inputHidden);

  const inputTD = document.createElement("td");
  inputTD.style.padding = 0;

  const buttonMinor = createElementSimple("button", "-");
  buttonMinor.classList.add("control-quantity");

  inputTD.appendChild(buttonMinor);

  const input = document.createElement("input");

  input.classList.add("quantity");
  input.min = 1;
  input.max = data.stock;
  input.value = 1;
  input.name = "quantity";
  input.type = "number";
  inputTD.appendChild(input);

  quantityArr.push(+input.value);
  quantityInput.value = reduce(quantityArr, 0);
  valueArr.push(+input.value * Number(data.price.replace(",", ".")));
  valueInput.value = reduce(valueArr, 2);

  const buttonPlus = createElementSimple("button", "+");
  buttonPlus.classList.add("control-quantity");

  inputTD.appendChild(buttonPlus);

  tr.appendChild(inputTD);

  const value = formatPrice(input.value, data.price);
  const valueTd = createElementSimple("td", value);
  tr.appendChild(valueTd);

  buttonMinor.setAttribute("data-index", quantityArr.length - 1);
  buttonMinor.addEventListener("click", (e) =>
    controlQty(e, input, -1, valueTd, data.price, quantityArr.length - 1)
  );

  buttonPlus.setAttribute("data-index", quantityArr.length - 1);
  buttonPlus.addEventListener("click", (e) =>
    controlQty(e, input, 1, valueTd, data.price)
  );

  const buttonAction = document.createElement("button");
  buttonAction.classList.add("back-none");
  buttonAction.setAttribute("data-id", data.id);
  buttonAction.addEventListener("click", controlModal);
  const imgtrash = document.createElement("img");
  imgtrash.src = "../icons/trash.svg";
  buttonAction.appendChild(imgtrash);

  const actionTd = document.createElement("td");
  actionTd.appendChild(buttonAction);
  tr.appendChild(actionTd);

  return tr;
};
