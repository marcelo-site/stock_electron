import { displayData } from "./displayTable.js";
import { btnDelete } from "./modal.js";
import { getInputValue, setValueInput, emptyValue } from "./inputsData.js";
import { addData } from "./addData.js";
import { actionsButton } from "./actionsButton.js";
import { objStoreProduct, openDbProduct } from "../utils/objectStoreData.js";
import { storeNameOrders } from "../utils/createDBOrder.js";
import { createDBProduct } from "../utils/createDBProduct.js";
import { _uuid } from "../utils/uuid.js";

let db;

const initialize = () => {
  if (window.indexedDB) {
    const request = openDbProduct();

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      displayData(db, getEdit);
    };

    request.onupgradeneeded = (e) => createDBProduct(db, e);
  } else {
    console.log("You don't have support");
  }
};

const onRemoveItem = (e) => {
  const key = e.target.getAttribute("data-id");
  if (key) {
    const objectStore = objStoreProduct(db);
    const request = objectStore.delete(key);

    request.oncomplete = (e) => {
      displayData(db, getEdit, storeNameOrders);
      initialize();
    };
  }
};

btnDelete.addEventListener("click", onRemoveItem);

const getEdit = (e) => {
  const objectStore = objStoreProduct(db);

  const key = e.target.getAttribute("data-id");
  const request = objectStore.get(key);

  request.onsuccess = (e) => {
    actionsButton(true);
    setValueInput(e.target.result);
  };

  request.onerror = (e) => console.log(e);
};

const onUpdate = () => {
  const objectStore = db
    .transaction(storeName, "readwrite")
    .objectStore(storeName);

  const newProduct = getInputValue();

  const request = objectStore.get(newProduct.id);

  request.onsuccess = (e) => {
    const product = e.target.result;
    actionsButton(false);
    const updateRequest = objectStore.put(newProduct);

    updateRequest.onsuccess = () => {
      emptyValue();
      displayData(db, getEdit);
    };
  };

  request.onerror = (e) => console.log(e);
};

document.querySelector("#btn-create").addEventListener("click", () => {
  addData(db, getInputValue(), () => displayData(db, getEdit));
  initialize();
});

document.querySelector("#btn-update").addEventListener("click", onUpdate);

document.querySelector("#uuid").addEventListener("click", () => {
  document.querySelector("#id").value = _uuid.generate();
});

document.addEventListener("DOMContentLoaded", initialize);
