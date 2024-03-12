import { objStoreProduct } from "../utils/objectStoreData.js";
import { controlModal } from "./modal.js";
const tbody = document.querySelector("#tbody");

const displayTable = (cursor, getEdit) => {
  const tr = document.createElement("tr");

  const idTd = document.createElement("td");
  idTd.innerHTML = cursor.value.id;
  tr.appendChild(idTd);

  const nameTd = document.createElement("td");
  nameTd.innerHTML = cursor.value.name;
  tr.appendChild(nameTd);

  const priceTd = document.createElement("td");
  priceTd.innerHTML = cursor.value.price;
  tr.appendChild(priceTd);

  const stockTd = document.createElement("td");
  stockTd.innerHTML = cursor.value.stock;
  tr.appendChild(stockTd);

  const div = document.createElement("div");
  const editButton = document.createElement("img");
  editButton.src = "./icons/pencil.svg";
  editButton.setAttribute("data-id", cursor.value.id);
  editButton.addEventListener("click", getEdit);
  div.appendChild(editButton);

  const deleteButton = document.createElement("img");
  deleteButton.src = "./icons/trash.svg";
  deleteButton.style.color = "red";
  deleteButton.setAttribute("data-id", cursor.value.id);
  deleteButton.addEventListener("click", controlModal);
  div.appendChild(deleteButton);

  const actionstd = document.createElement("td");
  actionstd.appendChild(div);

  actionstd.classList.add("container-actions");

  tr.appendChild(actionstd);
  return tr;
};

export const displayData = (db, getEdit) => {
  tbody.innerHTML = "";
  const objectStore = objStoreProduct(db);

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      const tr = displayTable(cursor, getEdit);
      tbody.appendChild(tr);

      cursor.continue();
    }
  };
};
