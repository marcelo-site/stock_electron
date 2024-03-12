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
import { trOrder } from "./trOrder.js";

const tbodyOrder = document.querySelector("#tbodyOrder");
let db;

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
    const objectStore = objStoreProduct(db);
    const request = objectStore.delete(+key);

    transaction.oncomplete = (e) => displayData(db, getEdit);
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

const onUpdate = () => {
  const objectStore = objStoreOrders(db);

  const newProduct = getInputValue();
  const request = objectStore.get(newProduct.id);

  request.onsuccess = (e) => {
    const product = e.target.result;
    // actionsButton(false);
    const updateRequest = objectStore.put(newProduct);

    updateRequest.onsuccess = () => {
      emptyValue();
      displayData(db, getEdit);
    };
  };
  request.onerror = (e) => console.log(e);
};

// document.querySelector("#btn-create").addEventListener("click", () => {
//   addData(db, getInputValue(), storeName, () =>
//     displayData(db, getEdit)
//   );
// });
document.querySelector("#btn-update").addEventListener("click", onUpdate);

document.addEventListener("DOMContentLoaded", initialize);
