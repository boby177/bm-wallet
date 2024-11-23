import randomstring from "randomstring";

export const invoiceNumberGenerator = async () => {
  const today = new Date();
  const formattedDate = `${today.getDate()}${today.getMonth() + 1}${today
    .getFullYear()
    .toString()
    .slice(-2)}`;

  const memberCode = randomstring.generate({
    length: 3,
    charset: "numeric",
  });

  const invoiceNumber = `INV${formattedDate}-${memberCode}`;

  return invoiceNumber;
};
