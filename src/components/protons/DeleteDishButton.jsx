/*********************************************** External Node modules ************************************************/
import { useCallback, useContext } from "react";

/********************************************** Internal library imports **********************************************/
import { dishAPI } from "/src/api";
import { Logger } from "/src/utils";
import { WebSocketContext } from "/src/contexts";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("DishCard");

/************************************************ Component Definition ************************************************/
const DeleteDishButton = ({ dishId }) => {
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const handleOnDeleteClick = useCallback(async () => {
    if (confirm("Are you sure you want to delete this dish?") === true) {
      if (confirm("This will be FOREVER. There will not be any going back, or CTRL+Z. Are you REALLY sure?") === true) {
        document.getElementById("on_loading_modal").showModal();
        try {
          await dishAPI.deleteDish(dishId);
          wsUpdateUserProfile();
        } catch (error) {
          const errorText = `Food dish ${dishId} could not be deleted!`;
          logger.error(errorText, error);
        }
        document.getElementById("on_loading_modal").close();
      }
    }
  }, []);

  return (
    <button className="btn glass btn-outline btn-error btn-sm" onClick={handleOnDeleteClick}>
      Delete
    </button>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DeleteDishButton };
