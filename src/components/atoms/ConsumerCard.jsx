/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************ Component Definition ************************************************/
const ConsumerCard = ({ _id, latest, name, surname }) => {
  const reviewsCount = 1000;
  const visitedRestaurantsCount = 5;

  const navigate = useNavigate();

  const handleOnUserCardClick = useCallback(() => {
    navigate(`/users/${_id}`);
  }, []);

  return (
    <div
      className="card w-72 bg-base-100 shadow-xl cursor-pointer"
      onClick={handleOnUserCardClick}
    >
      <div className="flex items-center p-6 justify-between">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-6"
        />
        <div className="flex flex-col items-end">
          {latest && <div className="badge badge-primary">NEW</div>}
          <h2 className="card-title text-2xl">{name}</h2>
          <p className="text-lg text-gray-600">{surname}</p>
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="p-6">
        <div className="flex justify-between text-lg">
          <strong>Visited Restaurants:</strong>
          <span>{visitedRestaurantsCount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-lg">
          <strong>Reviews:</strong>
          <span>{reviewsCount.toLocaleString()}</span>
        </div>
        <p className="text-lg mt-4"><strong>Achievements:</strong></p>
        <div className="flex justify-center space-x-4 mt-4">
          <img alt="Achievement 1" className="w-12 h-12" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" />
          <img alt="Achievement 2" className="w-12 h-12" src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp" />
          <img alt="Achievement 3" className="w-12 h-12" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" />
          <img alt="Achievement 4" className="w-12 h-12" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" />
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ConsumerCard };
