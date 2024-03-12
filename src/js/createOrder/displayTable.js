// import { controlModal } from "./modal.js";
const tbody = document.querySelector("#tbody");

export const displayTrProducts = (data, addProduct) => {
  const tr = document.createElement("tr");

  const idTd = document.createElement("td");
  idTd.innerHTML = data.id;
  tr.appendChild(idTd);

  const nameTd = document.createElement("td");
  nameTd.innerHTML = data.name;
  tr.appendChild(nameTd);

  const priceTd = document.createElement("td");
  priceTd.innerHTML = data.price;
  tr.appendChild(priceTd);

  const stockTd = document.createElement("td");
  stockTd.innerHTML = data.stock;
  tr.appendChild(stockTd);

  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-success");
  button.style.padding = "4px 8px";
  button.innerHTML = "Adicionar";
  button.setAttribute("data-id", data.id);
  button.setAttribute("data-name", data.name);
  button.setAttribute("data-price", data.price);
  button.setAttribute("data-stock", data.stock);
  button.addEventListener("click", addProduct);
  const actionsTd = document.createElement("td");
  actionsTd.appendChild(button);

  tr.appendChild(actionsTd);
  return tr;
};

// export const displayTableProducts = (db, dbName, storeName, addProduct) => {
//   tbody.innerHTML = "";

//   if (window.indexedDB) {
//     const request = window.indexedDB.open(dbName, 1);

//     request.onerror = (e) => {
//       console.log("Error request", e);
//       db = e.target.result;
//     };

//     request.onsuccess = (e) => {
//       db = e.target.result;

//       let transactionDisplay = db.transaction(storeName);
//       let objectStore = transactionDisplay.objectStore(storeName);

//       objectStore.openCursor().onsuccess = (event) => {
//         const cursor = event.target.result;

//         if (cursor) {
//           const tr = displayTrProducts(cursor.value, addProduct);
//           tbody.appendChild(tr);

//           cursor.continue();
//         }
//       };
//     };

//     request.onupgradeneeded = (e) => {
//       createDB(db, storeName, e);
//       console.log(e);
//     };
//   } else {
//     console.log("You don't have support");
//   }
// };

export const displayTableOrder = () => {
  const tr = document.createElement("tr");

  const idTd = document.createElement("td");
  idTd.innerHTML = data.id;
  tr.appendChild(idTd);

  const nameTd = document.createElement("td");
  nameTd.innerHTML = data.name;
  tr.appendChild(nameTd);

  const priceTd = document.createElement("td");
  priceTd.innerHTML = data.price;
  tr.appendChild(priceTd);

  const inputHidden = document.createElement("input");
  inputHidden.type = "hidden";
  inputHidden.value = data.id;
  inputHidden.name = "product";
  tr.appendChild(inputHidden);

  const inputTD = document.createElement("td");
  inputTD.style.padding = 0;
  const input = document.createElement("input");
  input.classList.add("quantity");
  input.min = 1;
  input.value = 1;
  input.name = "quantity";
  input.type = "number";

  inputTD.appendChild(input);

  tr.appendChild(inputTD);
  return tr;
};
