import { emptyValue } from "../order/inputsData.js";
import { controlModalMessage } from "./modal.js";
import { createDBProduct } from "../utils/createDBProduct.js";
import { createDBOrders } from "../utils/createDBOrder.js";

export const addData = (db, data, display) => {
  if (window.indexedDB) {
    const request = window.indexedDB.open("ordersDB", 1);

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      const transaction = e.target.result.transaction(["orders"], "readwrite");
      const objectStore = transaction.objectStore("orders");
      data.date = new Date();
      const req = objectStore.add(data);

      req.onsuccess = () => {
        connectDbProduct(data.products);
        // emptyValue();
      };

      transaction.oncomplete = (event) => {
        display(db);
      };

      transaction.onerror = (event) => {
        console.log("transaction error", event);
        controlModalMessage(
          "Não foi possivel fazer o registro  revise os <br/> dados e certifique que não está duplicando o id."
        );
      };
    };

    request.onupgradeneeded = (e) => createDBOrders(db, e);
  } else {
    console.log("You don't have support");
  }
};

const onUpdate = (db, data) => {
  const objectStore = db
    .transaction("product", "readwrite")
    .objectStore("product");

  const request = objectStore.get(data.productId);

  request.onsuccess = (e) => {
    const product = e.target.result;
    product.stock = Number(product.stock) - Number(data.quantity);
    const updateRequest = objectStore.put(product);

    updateRequest.onsuccess = () => {
      // emptyValue();
    };
  };

  request.onerror = (e) => console.log(e);
};

const connectDbProduct = (data) => {
  if (window.indexedDB) {
    const request = window.indexedDB.open("product", 1);

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      data.map((item) => onUpdate(e.target.result, item));
    };

    request.onupgradeneeded = (e) => createDBProduct(db, e);
  } else {
    console.log("You don't have support");
  }
};
