function filtersData(arr, filterName) {
  //过滤
  let data = [];
  arr.forEach((item) => {
    data.push(item[filterName]);
  });
  const uniqueArray = [...new Set(data)];
  //添加属性
  let resData = [];
  uniqueArray.forEach((item) => {
    resData.push({
      text: item,
      value: item,
    });
  });
  return resData;
}

export { filtersData };
