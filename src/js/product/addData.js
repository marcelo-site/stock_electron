import { objStoreProduct } from "../utils/objectStoreData.js";
import { emptyValue } from "./inputsData.js";
import { controlModalMessage } from "./modal.js";

export const addData = (db, data, display) => {
  const exists = Object.entries(data).find(([key, value]) => value === "");
  if (exists) {
    controlModalMessage(
      "Não foi possivel fazer o registro falta <br />  alguma informação."
    );

    return;
  }
  const objectStore = objStoreProduct(db);
  const request = objectStore.add(data);

  request.onsuccess = () => emptyValue();

  request.oncomplete = (event) => {
    display(db);
  };

  request.onerror = (event) => {
    console.log("transaction error", event);
    controlModalMessage(
      "Não foi possivel fazer o registro  revise os <br/> dados e certifique que não está duplicando o id."
    );
  };
};
