/************************************************** Hook Definition ***************************************************/
const useTimestamp = () => {
  const dateFormat = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };

  const getTimestampStr = (timestamp) => new Date(timestamp).toLocaleDateString("en-GB", dateFormat);

  return { getTimestampStr };
};

/********************************************** Named export (ES module) **********************************************/
export { useTimestamp };
