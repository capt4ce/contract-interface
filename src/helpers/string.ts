export const textEllipsis = (text: string, firstDigit = 4, lastDigit = 4) => {
  if (!text) return null;
  if (text.length <= firstDigit + lastDigit) return text;
  return `${text.substring(0, firstDigit)}...${text.substring(
    text.length - lastDigit
  )}`;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const base64DataToJsonString = (base64Data: string) => {
  const base64WithoutMetadata = base64Data
    .split('data:application/json;base64,')
    .pop() || '';
  return base64ToString(base64WithoutMetadata);
};

const base64ToString = (base64Str: string) => {
  return atob(base64Str);
};