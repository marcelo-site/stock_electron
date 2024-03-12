export const modalMessage = (modal) => {
  const controlModalMessage = (message) => {
    if (message) {
      modal.querySelector("#message").innerHTML = message;
    }

    modal.classList.toggle("none");
  };

  modal.addEventListener("click", () => controlModalMessage());
};
