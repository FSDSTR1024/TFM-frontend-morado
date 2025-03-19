/*********************************************** External Node modules ************************************************/
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { getUserImgURL, roundImg } from "/src/utils";
import { StarRating } from "/src/components/atoms";
import { useTimestamp } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const ReviewCard = ({ comment, createdAt, rating, user }) => {
  const { getTimestampStr } = useTimestamp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 px-3 py-2 bg-base-100 shadow-md border border-gray-200 rounded-lg">
    {/* User Avatar */}
    <div className="flex justify-between items-center gap-10">
      <div className="w-56">
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate(`/consumers/${user._id}`)}>
          <div className="avatar w-8 h-8 rounded-full border border-gray-300">
            <img
              alt={`${user._id} consumer profile picture`}
              className="border rounded-full"
              src={roundImg({ imgURL: getUserImgURL({ ...user }) })}
            />
          </div>
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm hover:underline">
                {user?.name || "Anonymous"} {user?.surname || ""}
              </h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-10 w-full">
        {comment ? <p className="text-md">{comment}</p> : <p className="text-sm text-gray-500">No comment</p>}
        <div className="flex flex-col items-end gap-1">
          <p className="text-xs text-gray-500">{getTimestampStr(createdAt)}</p>
          <StarRating createdAt={createdAt} nrOfReviews={1} rating={rating} showReviews={false} />
        </div>
      </div>
    </div>
  </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ReviewCard };
