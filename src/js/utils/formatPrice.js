export const formatPrice = (multiply, price) => {
  const n =
    Number(multiply) *
    Number(
      price
        // .replace(/\./g, "")
        .replace(/,/g, ".")
    );
  return n.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
