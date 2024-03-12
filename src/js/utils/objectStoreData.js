export const openDbProduct = () => window.indexedDB.open("product", 1);

export const objStoreProduct = (db) => {
  if (db?.target?.result) {
    return db.target.result
      .transaction("product", "readwrite")
      .objectStore("product");
  }

  return db.transaction("product", "readwrite").objectStore("product");
};

export const openDbOrder = () => window.indexedDB.open("ordersDB", 1);

export const objStoreOrders = (db) => {
  if (db?.target?.result) {
    return db.target.result
      .transaction("orders", "readwrite")
      .objectStore("orders");
  }

  return db.transaction("orders", "readwrite").objectStore("orders");
};

// const request = window.indexedDB.open(dbName, 1);
