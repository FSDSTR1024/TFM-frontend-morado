/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";

/************************************************** Hook Definition ***************************************************/
const useCards = () => {
  const getNewestItem = useCallback((itemsList) => {
    const newestItem = itemsList.reduce((newest, item) => {
      return new Date(item.createdAt) > new Date(newest.createdAt) ? item : newest;
    }, itemsList[0]);
    return newestItem;
  }, []);

  const getFilteredItems = useCallback((itemsList) => {
    return itemsList;
  }, []);

  const getSortedItems = useCallback(({ itemsList, sortKey, sortOrder }) => {
    const filteredItems = getFilteredItems(itemsList);
    if (sortKey !== "ASC" && sortOrder !== "DESC") {
      return filteredItems;
    }
    const sortedItems = [...filteredItems].sort((item, nextItem) => {
      if (sortOrder === "ASC") {  // ascending order
        return item[sortKey] > nextItem[sortKey] ? 1 : -1;
      } else if (sortOrder === "DESC") {  // descending order
        return item[sortKey] < nextItem[sortKey] ? 1 : -1;
      }
    });
    return sortedItems;
  }, []);

  return { getNewestItem, getSortedItems };
};

/********************************************** Named export (ES module) **********************************************/
export { useCards };
