const modalDelete = document.querySelector("#modal-delete");
const btnDelete = document.querySelector("#delete");
const modalMessage = document.querySelector("#modal-message");
console.log(btnDelete);

const KeyEl = document.querySelector("[data-key]");

export const controlModal = (e) => {
  if (e) {
    const key = e.target.getAttribute("data-id");
    if (key) {
      KeyEl.innerHTML = key;
      btnDelete.setAttribute("data-id", key);
    }
  } else {
    KeyEl.innerHTML = "";
    btnDelete.removeAttribute("data-id");
  }
  modalDelete.classList.toggle("none");
};

modalDelete.addEventListener("click", () => controlModal());

export const controlModalMessage = (message) => {
  if (message) {
    modalMessage.querySelector("#message").innerHTML = message;
  }

  modalMessage.classList.toggle("none");
};

modalMessage.addEventListener("click", () => controlModalMessage());

export { btnDelete };
