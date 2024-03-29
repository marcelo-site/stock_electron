import { emptyValue } from "./inputsData.js";
import { btnDelete } from "./modal.js";
import { displayTrProducts } from "./displayTable.js";
import { getInputValue } from "./inputsData.js";
import { addData } from "./addData.js";
import { trOrder } from "./trOrder.js";
import { createDBOrders } from "../utils/createDBOrder.js";
import { objStoreProduct, openDbProduct } from "../utils/objectStoreData.js";

const tbodyOrder = document.querySelector("#tbodyOrder");
let db;
let listButton = [];

const addProduct = (e) => {
  const data = {
    id: e.target.getAttribute("data-id"),
    name: e.target.getAttribute("data-name"),
    price: e.target.getAttribute("data-price"),
    stock: e.target.getAttribute("data-stock"),
  };

  const tr = trOrder(data);
  tbodyOrder.appendChild(tr);

  e.target.classList.add("events-none");
};

const initialize = () => {
  tbody.innerHTML = "";
  emptyValue();

  if (window.indexedDB) {
    const request = openDbProduct();

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      const objectStore = objStoreProduct(db);
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const tr = displayTrProducts(cursor.value, addProduct);
          tbody.appendChild(tr);

          cursor.continue();
        }
        listButton = Array.from(tbody.querySelectorAll("tr td button"));
        console.log(listButton[0]);
      };
    };

    request.onupgradeneeded = (e) => {
      createDBOrders(db, e);
    };
  } else {
    console.log("You don't have support");
  }
};

const deleteProductCart = (e) => {
  const id = e.target.getAttribute("data-id");
  const trAll = tbodyOrder.querySelectorAll(`tr`);
  const tr = Array.from(trAll).filter(
    (item) => item.getAttribute("data-id") === id
  );
  tbodyOrder.removeChild(tr[0]);
  listButton
    .filter((button) => button.getAttribute("data-id") === id)[0]
    .classList.remove("events-none");
};

btnDelete.addEventListener("click", deleteProductCart);

document.querySelector("#btn-create").addEventListener("click", () => {
  const data = getInputValue();
  tbody.innerHTML = "";
  // emptyValue();
  addData(db, data, initialize);
});

document.addEventListener("DOMContentLoaded", initialize);
