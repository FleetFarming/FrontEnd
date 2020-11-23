export const filterMapData = (data, obj) => {
  const { location, category, farmName, crop } = obj;
  console.log("data in filterMayData: ", data, farmName);
  const temp = data.filter((d) => d.title.includes(farmName));

  return temp;
};
