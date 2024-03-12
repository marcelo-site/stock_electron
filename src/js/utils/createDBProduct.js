export const dbNameProdcut = "product";
export const storeNameProduct = "product";

export const createDBProduct = (db, event) => {
  db = event.target.result;

  const objectStore = db.createObjectStore(storeNameProduct, {
    keyPath: "id",
    autoIncrement: false,
  });

  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("price", "price", { unique: false });
  objectStore.createIndex("stock", "stock", { unique: false });
};
