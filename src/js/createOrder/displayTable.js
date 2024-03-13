import {
  createElementSimple,
  appendElement,
  createInput,
} from "../utils/Element.js";
import { formatPrice } from "../utils/formatPrice.js";

import { controlModal } from "./modal.js";
const tbody = document.querySelector("#tbody");

export const displayTrProducts = (data, addProduct) => {
  const tr = document.createElement("tr");

  appendElement(tr, "td", data.id);
  appendElement(tr, "td", data.name);
  appendElement(tr, "td", formatPrice(1, data.price));
  appendElement(tr, "td", data.stock);

  const button = createElementSimple("button", "Adicionar", [
    "btn",
    "btn-success",
  ]);

  button.setAttribute("data-id", data.id);
  button.setAttribute("data-name", data.name);
  button.setAttribute("data-price", data.price);
  button.setAttribute("data-stock", data.stock);
  button.addEventListener("click", addProduct);
  const actionsTd = document.createElement("td");
  actionsTd.appendChild(button);

  tr.appendChild(actionsTd);
  return tr;
};

export const displayTableOrder = () => {
  const tr = document.createElement("tr");

  appendElement(tr, "td", data.id);
  appendElement(tr, "td", data.name);
  appendElement(tr, "td", data.price);

  const inputHidden = createInput("product", data.id, "hidden", 1);
  tr.appendChild(inputHidden);

  const inputTD = document.createElement("td");
  inputTD.style.padding = 0;
  const input = createInput("quantity", 1, "number", 1, data.stock, "quantity");

  inputTD.appendChild(input);

  const deleteButton = document.createElement("img");
  deleteButton.src = "../../icons/trash.svg";
  deleteButton.style.color = "red";
  deleteButton.setAttribute("data-id", data.id);
  deleteButton.addEventListener("click", controlModal);
  const div = document.createElement("div");
  div.appendChild(deleteButton);

  // const deleteButton = document.createElement("img");
  // deleteButton.src = "./icons/trash.svg";
  // deleteButton.style.color = "red";
  // deleteButton.setAttribute("data-id", data.id);
  // deleteButton.addEventListener("click", controlModal);
  // div.appendChild(deleteButton);

  const tdAction = document.createElement("td");
  tdAction.appendChild(div);
  tr.appendChild(tdAction);

  tr.appendChild(inputTD);
  return tr;
};
