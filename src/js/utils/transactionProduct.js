import { openDbProduct } from "./objectStoreData";

const transactionProduct = (data, resolve) => {
  // tbodyOrder.innerHTML = "";
  if (window.indexedDB) {
    const request = openDbProduct();

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      resolve(e);
    };

    request.onupgradeneeded = (e) => createDBOrders(db, e);
  } else {
    console.log("You don't have support");
  }
};
