export const formatPrice = (multiply, price) => {
  const n = Number(multiply) * Number(price.replace(",", "."));
  return n.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
