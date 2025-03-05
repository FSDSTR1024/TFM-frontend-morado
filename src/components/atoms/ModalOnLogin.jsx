/*********************************************** External Node modules ************************************************/
import { useContext } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const ModalOnLogin = () => {
  const { loggedUser } = useContext(AuthContext);

  return (
    <dialog className="modal" id="on_login_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{`👋 Hello ${loggedUser?.name}!`}</h3>
        <p className="py-4">You have been successfully logged in.</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnLogin };
