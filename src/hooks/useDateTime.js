/************************************************** Hook Definition ***************************************************/
const useDateTime = () => {
  const dateFormat = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };

  const getDateTimeStr = (datetime) => new Date(datetime).toLocaleDateString("en-GB", dateFormat);

  return { getDateTimeStr };
};

/********************************************** Named export (ES module) **********************************************/
export { useDateTime };
