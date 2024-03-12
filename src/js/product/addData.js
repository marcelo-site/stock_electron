import { objStoreProduct } from "../utils/objectStoreData.js";
import { emptyValue } from "./inputsData.js";
import { controlModalMessage } from "./modal.js";

export const addData = (db, data, display) => {
  const objectStore = objStoreProduct(db);
  const request = objectStore.add(data);

  request.onsuccess = () => emptyValue();

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
