/************************************************ Node modules needed ************************************************/
import { useCallback } from "react";

/************************************************** Hook Definition ***************************************************/
const useCards = () => {
  const getNewestItem = useCallback((itemsList) => {
    const newestItem = itemsList.reduce((newest, item) => {
      return new Date(item.createdAt) > new Date(newest.createdAt) ? item : newest;
    }, itemsList[0]);
    return newestItem;
  }, []);

  const getFilteredItems = useCallback(({ filterMethod, itemsList }) => {
    return itemsList.filter((item) => filterMethod(item));
  }, []);

  const getSortedItems = useCallback(({ itemsList, sortKey, sortOrder }) => {
    if (sortOrder !== "ASC" && sortOrder !== "DESC") {
      return itemsList;
    }
    const sortedItems = [...itemsList].sort((item, nextItem) => {
      if (sortOrder === "ASC") {  // ascending order
        return item[sortKey] > nextItem[sortKey] ? 1 : -1;
      } else if (sortOrder === "DESC") {  // descending order
        return item[sortKey] < nextItem[sortKey] ? 1 : -1;
      }
    });
    return sortedItems;
  }, []);

  const getSortedFilteredItems = useCallback(({ filterMethod, itemsList, sortKey, sortOrder }) => {
    return getSortedItems({ itemsList: getFilteredItems({ filterMethod, itemsList }), sortKey, sortOrder });
  }, [getFilteredItems, getSortedItems]);

  return { getNewestItem, getSortedFilteredItems };
};

/********************************************** Named export (ES module) **********************************************/
export { useCards };
