export const storeNameOrders = "orders";

export const createDBOrders = (db, event) => {
  db = event.target.result;

  const objectStore = db.createObjectStore(storeNameOrders, {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("value", "value", { unique: false });
  objectStore.createIndex("quantiy", "quantity", { unique: false });
  objectStore.createIndex("date", "date", { unique: false });
  objectStore.createIndex("products", "products", { unique: false });
};
