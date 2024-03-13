import { displayData } from "./displayTable.js";
import { controlModal, btnDelete } from "./modal.js";
import { getInputValue, setValueInput, emptyValue } from "./inputsData.js";
import { actionsButton } from "./actionsButton.js";
import {
  objStoreOrders,
  objStoreProduct,
  openDbOrder,
  openDbProduct,
} from "../utils/objectStoreData.js";
import { createDBOrders } from "../utils/createDBOrder.js";
import { trOrder, quantityArr, valueArr, dataInit } from "./trOrder.js";

export const tbodyOrder = document.querySelector("#tbodyOrder");

let db;
const containerOrder = document.querySelector("#container-order");

const changeVisibleOrder = (visible) => {
  if (visible) containerOrder.classList.remove("none");
  else containerOrder.classList.add("none");
};

changeVisibleOrder(false);

const initialize = () => {
  if (window.indexedDB) {
    const request = openDbOrder();

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      displayData(db, getEdit);
    };

    request.onupgradeneeded = (e) => createDBOrders(db, e);
  } else {
    console.log("You don't have support");
  }
};

const onRemoveItem = (e) => {
  const key = e.target.getAttribute("data-id");
  if (key) {
    const objectStore = objStoreOrders(db);
    const request = objectStore.delete(+key);

    request.onsuccess = (e) => displayData(db, getEdit);
  }
};

btnDelete.addEventListener("click", onRemoveItem);

const addProduct = (data) => {
  tbodyOrder.innerHTML = "";
  if (window.indexedDB) {
    const request = openDbProduct();

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      const objectStore = objStoreProduct(e);

      // limpar array para calculo de valor e quantidade
      valueArr.splice(0, valueArr.length);
      quantityArr.splice(0, quantityArr.length);
      dataInit.splice(0, dataInit.length);
      //

      data.products.map((item) => {
        const key = item.productId;
        const req = objectStore.get(key);

        req.onsuccess = (event) => {
          const dataTable = { ...event.target.result, data };
          const tr = trOrder(dataTable);
          tbodyOrder.appendChild(tr);
        };
      });
    };

    request.onupgradeneeded = (e) => createDBOrders(db, e);
  } else {
    console.log("You don't have support");
  }
};

const getEdit = (e) => {
  changeVisibleOrder(true);
  const objectStore = objStoreOrders(db);

  const key = e.target.getAttribute("data-id");
  const request = objectStore.get(+key);

  request.onsuccess = (event) => {
    actionsButton(true);

    const data = event.target.result;
    addProduct(data);
    setValueInput(data);
  };

  request.onerror = (e) => console.log(e);
};

const getEditProduct = (dbPrduct, data, updateStock) => {
  const objectStore = objStoreProduct(dbPrduct);

  const key = data.productId;
  const request = objectStore.get(key);

  request.onsuccess = (event) => {
    actionsButton(false);
    const newProduct = event.target.result;
    newProduct.stock = newProduct.stock + updateStock;
    const updateRequest = objectStore.put(newProduct);
    const result = event.target.result;
    setValueInput(result);
  };

  request.onerror = (e) => console.log(e);
};

const onUpdate = () => {
  changeVisibleOrder(false);
  const objectStore = objStoreOrders(db);

  const newOrder = getInputValue();
  const request = objectStore.get(+newOrder.id);

  request.onsuccess = (e) => {
    const product = e.target.result;
    actionsButton(false);
    const updateRequest = objectStore.put(newOrder);
    updateRequest.onsuccess = () => {
      const dbProduct = openDbProduct();

      dbProduct.onsuccess = (e) => {
        emptyValue();
        const data = e.target.result;

        newOrder.products.map((item, i) => {
          const n = Number(dataInit[i].init) - Number(dataInit[i].currenty);
          getEditProduct(e.target.result, item, n);
        });
        displayData(db, getEdit);
      };
    };
  };
  request.onerror = (e) => console.log(e);
};

document.querySelector("#btn-cancel").addEventListener("click", () => {
  emptyValue();
  changeVisibleOrder(false);
});

document.querySelector("#btn-create").addEventListener("click", () => {
  addData(db, getInputValue(), storeName, () => displayData(db, getEdit));
});

document.querySelector("#btn-update").addEventListener("click", onUpdate);

document.addEventListener("DOMContentLoaded", initialize);
