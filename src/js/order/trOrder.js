import {
  appendElement,
  createElementSimple,
  createInput,
} from "../utils/Element.js";
import { formatPrice } from "../utils/formatPrice.js";
import { controlModal, controlModalDeleteOrder } from "./modal.js";

const quantityInput = document.querySelector("#quantity");
const valueInput = document.querySelector("#value");

export let valueArr = [];
export let quantityArr = [];
export let dataInit = [];

const reduce = (value, fixed) =>
  value.reduce((acc, curr) => acc + curr, 0).toFixed(fixed);

const multiply = (mult, price) =>
  Number(mult) * Number(price.replace(",", "."));

const controlQty = (e, el, sum, td, price) => {
  const index = e.target.getAttribute("data-index");
  let value = +el.value;
  const min = +el.min;
  const max = +el.max;

  if ((sum < 0 && value > 1) || (sum > 0) & (value < max)) {
    const valueAt = value + sum;

    el.value = valueAt;
    td.innerHTML = formatPrice(valueAt, price);
    valueArr[+index] = multiply(valueAt, price);
    quantityArr[+index] = valueAt;
    dataInit[+index].currenty = valueAt;
    console.log(dataInit);
    quantityInput.value = reduce(quantityArr, 0);
    valueInput.value = reduce(valueArr, 2);
  }
};

export const trOrder = (data) => {
  dataInit.push({
    product: data.data.products[0].productId,
    init: +data.data.products[0].quantity,
    currenty: 0,
  });
  // dataEnd.push(data.data.products[0]);

  const product = data.data.products.filter(
    (item) => item.productId === data.id
  )[0];

  const tr = document.createElement("tr");
  tr.setAttribute("data-id", data.id);

  appendElement(tr, "td", data.id);
  appendElement(tr, "td", data.name);
  appendElement(tr, "td", formatPrice(1, data.price));

  const inputHidden = createInput("product", data.id, "hidden");
  tr.appendChild(inputHidden);

  const inputTD = document.createElement("td");
  inputTD.style.padding = 0;
  const buttonMinor = document.createElement("button");

  buttonMinor.classList.add("control-quantity");
  buttonMinor.innerHTML = "-";
  inputTD.appendChild(buttonMinor);

  const input = createInput(
    "quantity",
    product.quantity,
    "number",
    1,
    data.stock,
    "quantity"
  );
  inputTD.appendChild(input);

  quantityArr.push(+product.quantity);
  quantityInput.value = reduce(quantityArr, 0);
  valueArr.push(+product.quantity * Number(data.price.replace(",", ".")));
  valueInput.value = reduce(valueArr, 2);

  const buttonPlus = document.createElement("button");
  buttonPlus.classList.add("control-quantity");
  buttonPlus.innerHTML = "+";

  inputTD.appendChild(buttonPlus);

  tr.appendChild(inputTD);

  const valueTd = createElementSimple(
    "td",
    formatPrice(input.value, data.price)
  );

  tr.appendChild(valueTd);

  buttonMinor.setAttribute("data-index", quantityArr.length - 1);
  buttonMinor.addEventListener("click", (e) =>
    controlQty(e, input, -1, valueTd, data.price)
  );

  buttonPlus.setAttribute("data-index", quantityArr.length - 1);
  buttonPlus.addEventListener("click", (e) =>
    controlQty(e, input, 1, valueTd, data.price)
  );

  const buttonAction = document.createElement("button");
  buttonAction.classList.add("back-none");
  buttonAction.setAttribute("data-id", data.id);
  buttonAction.addEventListener("click", controlModalDeleteOrder);
  const imgtrash = document.createElement("img");
  imgtrash.src = "../icons/trash.svg";
  buttonAction.appendChild(imgtrash);

  const actionTd = document.createElement("td");
  actionTd.appendChild(buttonAction);
  tr.appendChild(actionTd);

  return tr;
};

// export const addTableOrder = (dataTable) => {

//   return;
// };
