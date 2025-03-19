/*********************************************** External Node modules ************************************************/
import { NavLink } from "react-router-dom";

/********************************************** Internal library imports **********************************************/

/**************************************************** Page Content ****************************************************/
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center">
      <h1 className="text-6xl font-bold text-error mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-10">
        Oops! The page you're looking for doesn't exist.
      </p>
      <NavLink to="/" className="btn btn-error btn-wide">
        Go Back Home
      </NavLink>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { NotFoundPage };
