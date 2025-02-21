/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { useCards } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const CardsDisplay = ({ CardComponent, cardProperties, filterMethod, headerSubtitle, headerTitle, itemsList }) => {
  const { getNewestItem, getSortedFilteredItems } = useCards();

  const [sortedFilteredItems, setSortedFilteredItems] = useState(itemsList);
  const [newestItem, setNewestItem] = useState(null);

  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");

  const handleSortKeyChange = (event) => setSortKey(event.target.value);
  const handleSortOrderChange = (event) => setSortOrder(event.target.value);

  useEffect(() => {
    setNewestItem(getNewestItem(itemsList));
    setSortedFilteredItems(getSortedFilteredItems({ filterMethod, itemsList, sortKey, sortOrder }));
  }, [filterMethod, itemsList, sortKey, sortOrder]);

  return (
    <section className="p-6 bg-base-200 min-h-screen">
      {/* DisplayHeader */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{headerTitle}</h1>
        <p className="text-lg text-gray-600">
          {headerSubtitle} (total: {itemsList.length})
        </p>
      </div>

      {/* DisplaySortingBtns */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-8 items-center">
          <div className="flex space-x-4 items-center">
            <label className="block text-sm font-medium text-gray-700">Sort By</label>
            <select
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              onChange={handleSortKeyChange}
              value={sortKey}
            >
              {cardProperties.map((cardProperty, index) => (
                <option key={index} value={cardProperty.value}>
                  {cardProperty.text}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4 items-center">
            <label className="block text-sm font-medium text-gray-700">Order</label>
            <select
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              onChange={handleSortOrderChange}
              value={sortOrder}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* DisplaySortingSubheader */}
      {cardProperties.some((cardProperty) => cardProperty.filter && cardProperty.filter.value !== "") && (
        <div className="text-center mb-2">
          <h2 className="text-lg text-gray-600">Showing {sortedFilteredItems.length} filtered consumers:</h2>
        </div>
      )}

      {/* FilteredSortedCards */}
      <div className="flex justify-center">
        {/* Filters */}
        <aside className="mb-8 mr-10">
          <div className="space-y-4">
            {cardProperties.map((cardProperty) => {
              if (cardProperty.filter) {
                return (
                  <div key={cardProperty.value}>
                    <label className="block text-sm font-medium text-gray-700">
                      Filter By &quot;{cardProperty.text}&quot;
                    </label>
                    <input
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      onChange={cardProperty.filter.onChangeMethod}
                      placeholder={`Enter ${cardProperty.text.toLowerCase()}...`}
                      type={cardProperty.filter.inputType}
                      value={cardProperty.filter.value}
                    />
                  </div>
                );
              }
            })}
          </div>
        </aside>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-10 max-w-7xl">
          {sortedFilteredItems &&
            sortedFilteredItems.map((item) => {
              return <CardComponent isTheNewest={item === newestItem} key={item._id} {...item} />;
            })}
        </div>
      </div>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { CardsDisplay };
