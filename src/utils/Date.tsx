export const getToday = () => {
  var today = new Date();
  return dateFormat(today);
}

export const dateParseNumber = (date:string) => {
  return parseInt(date.replaceAll('-',''));
}

export const dateFormat = (date:any) => {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);

  var dateString = year + '-' + month  + '-' + day;
  return dateString;
}
