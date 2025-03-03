/************************************************ Node modules needed ************************************************/
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts/AuthContext";
import { Loading, StarRating } from "/src/components/atoms";
import { getUserImgURL } from "/src/utils";

/************************************************ Component Definition ************************************************/
const RestaurantProfile = () => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/restaurants/${loggedUser._id}/edit`);
  };

  const handleAddDishClick = () => {
    navigate(`/restaurants/${loggedUser._id}/add-dish`);
  };

  if (!loggedUser) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <img alt={loggedUser.name} className="w-60 h-60 rounded-lg mr-6" src={getUserImgURL({ ...loggedUser })} />
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">{loggedUser.name}</h1>
              <StarRating textSize="lg" {...loggedUser} />
            </div>
            <p className="text-lg text-gray-600 mb-2">📍 {loggedUser.location}</p>
            <p className="text-xl text-gray-400 mb-2">{loggedUser.description}</p>
            <div className="divider text-xl font-semibold mt-6 mb-3">Contact Information</div>
            <div className="mb-2">
              <span className="text-lg text-gray-400 font-semibold">📧 Email: </span>
              <span className="text-lg text-gray-600">{loggedUser.email}</span>
            </div>
            <div className="mb-2">
              <span className="text-lg text-gray-400 font-semibold">📞 Phone: </span>
              <span className="text-lg text-gray-600">{loggedUser.phone}</span>
            </div>
            <div>
              <span className="text-lg text-gray-400 font-semibold">🌐 Website: </span>
              <span className="text-lg text-gray-600">
                <a href={loggedUser.web_page} className="text-blue-500 underline">
                  {loggedUser.web_page}
                </a>
              </span>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary mr-2" onClick={handleEditClick}>Edit</button>
              <button className="btn btn-secondary" onClick={handleAddDishClick}>Add a Dish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantProfile };
