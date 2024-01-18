export const getToday = () => {
  const today = new Date();
  return dateFormat(today);
};

export const dateParseNumber = (date: string) => {
  return parseInt(date.replaceAll('-', ''));
};

interface Datetype {
  getFullYear: () => void;
  getMonth: () => number;
  getDate: () => void;
}
export const dateFormat = (date: Datetype) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;
  return dateString;
};
