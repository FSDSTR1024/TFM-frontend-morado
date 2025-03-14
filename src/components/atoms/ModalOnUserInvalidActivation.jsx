/************************************************ Component Definition ************************************************/
const ModalOnUserInvalidActivation = () => {
  return (
    <dialog className="modal" id="on_user_invalid_activation_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">⚠ Invalid Activation Link</h3>
        <p className="pt-4">
          The activation link you have used is invalid or has expired. This could happen if:
        </p>
        <ul className="list-disc list-inside pt-4">
          <li>The link was mistyped or incomplete.</li>
          <li>The link has already been used to activate an account.</li>
          <li>The link has expired due to time limitations.</li>
        </ul>
        <p className="pt-4">
          Please check the link and try again. If the issue persists, you could request a new activation link or contact support for assistance.
        </p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnUserInvalidActivation };
