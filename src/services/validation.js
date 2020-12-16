export const ValidateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/.test(mail)) {
    return true;
  }
  return false;
};

export const isNumber = () => {};

export default { ValidateEmail, isNumber };
