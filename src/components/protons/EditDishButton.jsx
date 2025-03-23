/*********************************************** External Node modules ************************************************/
import { useCallback, useEffect, useState } from "react";

/************************************************* Internal libraries *************************************************/
import { dishAPI } from "/src/api";
import { Logger } from "/src/utils";
import { ModalOnDishEdit } from "/src/components/molecules";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("DishCard");

/************************************************ Component Definition ************************************************/
const EditDishButton = ({ dishId }) => {
  const [dish, setDish] = useState(null);
  useEffect(() => {
    const getDish = async () => {
      try {
        const { dish } = await dishAPI.getDishById(dishId);
        setDish(dish);
      } catch (error) {
        setDish(null);
        const errorText = "There was an error while trying to fetch the food Dish!";
        logger.error(errorText, error);
      }
    };

    getDish();
  }, [dishId]);

  const handleOnEditClick = useCallback(() => {
    document.getElementById("on_dish_edit_modal").showModal();
  }, []);

  return (
    <>
      <ModalOnDishEdit {...dish} />
      <button className="btn glass btn-outline btn-success btn-sm" onClick={handleOnEditClick}>
        Edit
      </button>
    </>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { EditDishButton };
