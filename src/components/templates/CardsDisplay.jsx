/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Loading } from "/src/components/atoms";
import { useCards } from "/src/hooks";
import { WebSocketContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const CardsDisplay = ({ CardComponent, cardProperties, filterMethod, headerSubtitle, headerTitle, itemsKind, itemsList, isLoading }) => {
  const { getNewestItem, getSortedFilteredItems } = useCards();
  const { wsGetOnlineUsers, wsOnlineConsumers, wsOnlineRestaurants } = useContext(WebSocketContext);

  const getIsOnline = useCallback(({ list, _id }) => {
    return list.some((user) => user._id === _id);
  }, []);

  const [onlineConsumers, setOnlineConsumers] = useState(wsOnlineConsumers);
  const [onlineRestaurants, setOnlineRestaurants] = useState(wsOnlineRestaurants);
  useEffect(() => {
    setOnlineConsumers(wsOnlineConsumers);
    setOnlineRestaurants(wsOnlineRestaurants);
  }, [wsOnlineConsumers, wsOnlineRestaurants]);

  /* Ask for the updated list of online users */
  useEffect(() => {
    wsGetOnlineUsers();
  }, [wsGetOnlineUsers]);

  const [sortedFilteredItems, setSortedFilteredItems] = useState(itemsList);
  const [newestItem, setNewestItem] = useState(null);

  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");

  const handleSortKeyChange = (event) => setSortKey(event.target.value);
  const handleSortOrderChange = (event) => setSortOrder(event.target.value);

  useEffect(() => {
    setNewestItem(getNewestItem(itemsList));
    setSortedFilteredItems(getSortedFilteredItems({ filterMethod, itemsList, sortKey, sortOrder }));
  }, [filterMethod, getNewestItem, getSortedFilteredItems, itemsList, sortKey, sortOrder]);

  return (
    <section className="p-6 bg-base-200 min-h-screen flex flex-col items-center">
      {/* DisplayHeader */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">{headerTitle}</h1>
        <p className="text-lg text-gray-600">
          <span>{headerSubtitle}</span>
          {!isLoading && <span> (total: {itemsList.length})</span>}
        </p>
      </div>

      {/* FiltersAndSortingsBtns */}
      <div className="flex justify-center gap-32">
        {/* Filters */}
        <aside>
          <div className="flex justify-center gap-5">
            {cardProperties.map((cardProperty) => {
              if (cardProperty.filter) {
                return (
                  <fieldset className="fieldset" key={cardProperty.value}>
                    <legend className="fieldset-legend text-sm font-medium text-gray-700">
                      Filter By &quot;{cardProperty.text}&quot;
                    </legend>
                    <input
                      className="input"
                      onChange={cardProperty.filter.onChangeMethod}
                      placeholder={`Enter ${cardProperty.text.toLowerCase()}...`}
                      type={cardProperty.filter.inputType}
                      value={cardProperty.filter.value}
                    />
                  </fieldset>
                );
              } else {
                return null;
              }
            })}
          </div>
        </aside>

        {/* DisplaySortingBtns */}
        <div className="flex justify-center">
          <div className="flex gap-5 items-center">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-gray-700">Sort By</legend>
              <select className="select" onChange={handleSortKeyChange} value={sortKey}>
                {cardProperties.map((cardProperty, index) => (
                  <option key={index} value={cardProperty.value}>
                    {cardProperty.text}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-gray-700">Order</legend>
              <select className="select" onChange={handleSortOrderChange} value={sortOrder}>
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
            </fieldset>
          </div>
        </div>
      </div>

      {/* DisplaySortingSubheader */}
      {cardProperties.some((cardProperty) => cardProperty.filter && cardProperty.filter.value !== "") && (
        <div className="text-center mt-2">
          <h2 className="text-lg text-gray-600">Showing {sortedFilteredItems.length} filtered items:</h2>
        </div>
      )}

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-7 max-w-7xl mt-6">
        {isLoading ? (
          <Loading />
        ) : !sortedFilteredItems ? (
          <div className="px-6 py-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-lg font-semibold">
              <span>No </span>
              <span className="underline">{itemsKind}</span>
              <span> were found in the database...</span>
            </p>
          </div>
        ) : (
          sortedFilteredItems.map((item) => {
            return (
              <CardComponent
                isConsumerOnline={getIsOnline({ list: onlineConsumers, _id: item._id })}
                isRestaurantOnline={getIsOnline({ list: onlineRestaurants, _id: item._id })}
                isTheNewest={item === newestItem}
                key={item._id}
                {...item}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { CardsDisplay };
