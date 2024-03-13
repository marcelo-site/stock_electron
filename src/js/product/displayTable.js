import { objStoreProduct } from "../utils/objectStoreData.js";
import { controlModal } from "./modal.js";
import { formatPrice } from "../utils/formatPrice.js";
import { createElementSimple, appendElement } from "../utils/Element.js";
const tbody = document.querySelector("#tbody");

const displayTable = (data, getEdit) => {
  const tr = document.createElement("tr");

  appendElement(tr, "td", data.id);
  appendElement(tr, "td", data.name);
  appendElement(tr, "td", formatPrice(1, data.price));
  appendElement(tr, "td", data.stock);

  const div = document.createElement("div");
  const editButton = document.createElement("img");
  editButton.src = "./icons/pencil.svg";
  editButton.setAttribute("data-id", data.id);
  editButton.addEventListener("click", getEdit);
  div.appendChild(editButton);

  const deleteButton = document.createElement("img");
  deleteButton.src = "./icons/trash.svg";
  deleteButton.style.color = "red";
  deleteButton.setAttribute("data-id", data.id);
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
      const tr = displayTable(cursor.value, getEdit);
      tbody.appendChild(tr);

      cursor.continue();
    }
  };
};
