/*********************************************** External Node modules ************************************************/
import { useContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const ModalOnLogout = () => {
  const { loggedUser } = useContext(AuthContext);

  const [prevLoggedUser, setPrevLoggedUser] = useState(loggedUser ? loggedUser : null);
  useEffect(() => {
    if (loggedUser) {
      setPrevLoggedUser(loggedUser);
    }
  }, [loggedUser]);

  return (
    <dialog className="modal" id="on_logout_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{`👋 Goodbye ${prevLoggedUser?.name}!`}</h3>
        <p className="py-4">You have been successfully logged out.</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnLogout };
