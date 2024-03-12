let db;
const dbName = "ordersDB";
const storeName = "orders";

const createDB = (db, event) => {
  db = event.target.result;

  const objectStore = db.createObjectStore(storeName, {
    keyPath: "id",
    autoIncrement: false,
  });

  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("price", "price", { unique: false });
  objectStore.createIndex("quantiy", "quntity", { unique: false });
  objectStore.createIndex("products", "products", { unique: false });
};

const initialize = () => {
  if (window.indexedDB) {
    const request = window.indexedDB.open(dbName, 1);

    request.onerror = (e) => {
      console.log("Error request", e);
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      displayData(db, getEdit, storeName);
    };

    request.onupgradeneeded = (e) => createDB(db, e);
  } else {
    console.log("You don't have support");
  }
};

document.addEventListener("DOMContentLoaded", initialize);
