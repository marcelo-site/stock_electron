const btnCreate = document.querySelector("#btn-create");
const btnUpdate = document.querySelector("#btn-update");
const btnCancel = document.querySelector("#btn-cancel");

export const actionsButton = (edit) => {
  if (edit) {
    btnCreate.classList.add("events-none");
    btnUpdate.classList.remove("events-none");
    btnCancel.classList.remove("events-none");
  } else {
    btnCreate.classList.remove("events-none");
    btnUpdate.classList.add("events-none");
    btnCancel.classList.add("events-none");
  }
};

btnCancel.addEventListener("click", () => actionsButton(false));
