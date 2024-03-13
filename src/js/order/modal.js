import { tbodyOrder } from "./index.js";
const modalDelete = document.querySelector("#modal-delete");
const btnDelete = document.querySelector("#delete");
const modalMessage = document.querySelector("#modal-message");

const modalDeleteOrder = document.querySelector("#modal-delete-order");
const btnDeleteOrder = document.querySelector("#delete-order");

const KeyEl = document.querySelector("[data-key]");
const KeyOrder = document.querySelector("[data-order]");

let productsDeleted = [];

export const controlModal = (e) => {
  if (e) {
    const key = e.target.getAttribute("data-id");
    if (key) {
      KeyEl.innerHTML = key;
      btnDelete.setAttribute("data-id", key);
    }
  } else {
    KeyEl.innerHTML = "";
    btnDelete.removeAttribute("data-id");
  }
  modalDelete.classList.toggle("none");
};

modalDelete.addEventListener("click", () => controlModal());

const deleteProductCart = (key) => {
  const trAll = tbodyOrder.querySelectorAll(`tr`);
  const tr = Array.from(trAll).filter((item) => {
    return item.getAttribute("data-id") === key;
  })[0];

  const product = {
    productId: tr.querySelector("input").value,
    quantity: tr.querySelector("td input").value,
  };

  productsDeleted.push(product);

  tbodyOrder.removeChild(tr);
};

export const controlModalDeleteOrder = (e) => {
  if (e) {
    const key = e.target.getAttribute("data-id");
    if (key) {
      KeyOrder.innerHTML = key;
      btnDeleteOrder.addEventListener("click", function deleteProduct() {
        deleteProductCart(key);
        btnDeleteOrder.removeEventListener("click", deleteProduct);
      });
    }
  } else {
    KeyOrder.innerHTML = "";
  }

  modalDeleteOrder.classList.toggle("none");
};

modalDeleteOrder.addEventListener("click", () => controlModalDeleteOrder());

export const controlModalMessage = (message) => {
  if (message) {
    modalMessage.querySelector("#message").innerHTML = message;
  }
  modalMessage.classList.toggle("none");
};

modalMessage.addEventListener("click", () => controlModalMessage());

export { btnDelete };
