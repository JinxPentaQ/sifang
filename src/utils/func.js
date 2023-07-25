export const getOptionsText = (list, value) => {
  const valueList = list.filter((item) => +item.value === +value);
  return valueList.length > 0 ? valueList[0].text : '';
} 
export const getOptionsTag = (list, value) => {
  const valueList = list.filter((item) => +item.value === +value);
  return valueList.length > 0 ? valueList[0].tag : '';
} 
export const getOptionsItem = (list, value) => {
  const valueList = list.filter((item) => +item.value === +value);
  return valueList.length > 0 ? valueList[0] : {};
}