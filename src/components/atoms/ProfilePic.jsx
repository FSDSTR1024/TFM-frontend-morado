/************************************************ Node modules needed *************************************************/
import { useContext } from "react";

/************************************************* Internal libraries *************************************************/
import { AuthContext } from "/src/contexts";
import { getUserImgURL, roundImg } from "/src/utils";
import { LogoutButton, ProfileButton } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const ProfilePic = () => {
  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="dropdown dropdown-end">
      <div className="avatar btn btn-circle btn-ghost" role="button" tabIndex={0}>
        <div className="ring-1 ring-offset-2 ring-offset-base-100 ring-primary rounded-full w-12">
          <img alt={`${loggedUser._id} profile picture`} src={roundImg({ imgURL: getUserImgURL({ ...loggedUser }) })} />
        </div>
      </div>
      <ul className="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-1 w-auto p-2 shadow gap-2" tabIndex={0}>
        <li>
          <ProfileButton />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ProfilePic };
