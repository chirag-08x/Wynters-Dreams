export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
  return newNumber;
};
// export const formatPrice = (number) => {
//   const newNumber = Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(number / 100);
//   return newNumber;
// };
