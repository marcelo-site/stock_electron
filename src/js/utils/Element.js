export const createElementSimple = (el, data, className) => {
  const element = document.createElement(el);
  element.innerHTML = data;
  if (typeof className === "string") {
    element.classList.add(className);
  } else if (typeof className === "object") {
    className.map((item) => element.classList.add(item));
  }
  return element;
};

export const appendElement = (append, child, data, className, attributes) => {
  const element = document.createElement(child);
  element.innerHTML = data;

  if (typeof className === "string") {
    element.classList.add(className);
  } else if (typeof className === "object") {
    className.map((item) => element.classList.add(item));
  }

  if (attributes) {
    attributes.map((item) => element.setAttribute(item.name, item.valueue));
  }
  return append.appendChild(element);
};

export const createInput = (name, value, type, min, max, className) => {
  const input = document.createElement("input");
  input.name = name;
  input.value = value || "";
  input.type = type || "text";
  if (min) {
    input.min = min;
  }
  if (max) {
    input.max = max;
  }

  if (typeof className === "string") {
    input.classList.add(className);
  } else if (typeof className === "object") {
    className.map((item) => input.classList.add(item));
  }
  return input;
};
