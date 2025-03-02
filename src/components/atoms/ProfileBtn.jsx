/************************************************ Node modules needed *************************************************/
import { useContext } from "react";

/************************************************* Internal libraries *************************************************/
import { AuthContext } from "/src/contexts/AuthContext";
import { getUserImgURL, roundImg } from "/src/utils";

/************************************************ Component Definition ************************************************/
const ProfileBtn = () => {
  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="dropdown dropdown-end">
      <div className="avatar btn btn-circle btn-ghost" role="button" tabIndex={0}>
        <div className="ring-1 ring-offset-2 ring-offset-base-100 ring-primary rounded-full w-12">
          <img alt={`${loggedUser._id} profile picture`} src={roundImg({ imgURL: getUserImgURL({ ...loggedUser }) })} />
        </div>
      </div>
      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow" tabIndex={0}>
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ProfileBtn };
