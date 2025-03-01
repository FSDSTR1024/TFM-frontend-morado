/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************* Internal libraries *************************************************/
import { notDefinedImgUrl } from "/src/constants";

/************************************************ Component Definition ************************************************/
const DishCard = ({ _id, img_url, isTheNewest, name }) => {
  const navigate = useNavigate();

  const handleOnCardClick = useCallback(() => {
    navigate(`/dishes/${_id}`);
  }, [_id]);

  const currentUserImgUrl = img_url ? img_url : notDefinedImgUrl;
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <div className="flex justify-center">
        <button className="btn glass btn-block btn-outline btn-info btn-sm" onClick={handleOnCardClick}>View</button>
      </div>
      <div className="flex items-center p-2 pr-4 justify-between h-28">
        <img
          alt="Profile"
          className="w-20 h-20 rounded-full mr-6"
          src={currentUserImgUrl}
        />
        <div className="flex flex-col items-end">
          {isTheNewest && <div className="badge badge-primary mb-2">NEW</div>}
          <h2 className="card-title text-2xl">{name}</h2>
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DishCard };
