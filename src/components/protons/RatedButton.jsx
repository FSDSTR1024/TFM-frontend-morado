/*********************************************** External Node modules ************************************************/
import { useNavigate } from 'react-router-dom';

/************************************************ Component Definition ************************************************/
const RatedButton = ({ dishId }) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn glass btn-outline btn-warning btn-sm flex items-center gap-1"
      onClick={() => navigate(`/dishes/${dishId}#reviews`)}
    >
      <svg
        className="size-[1.2em]"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3l2.83 5.74L21 9.75l-4.5 4.38L17.66 21 12 17.72 6.34 21l1.16-6.87L3 9.75l6.17-.99L12 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Rated</span>
    </button>
  );
};
/********************************************** Named export (ES module) **********************************************/
export { RatedButton };
