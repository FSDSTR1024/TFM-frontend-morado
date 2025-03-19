/************************************************ Component Definition ************************************************/
const ModalOnAccountDelete = () => {
  return (
    <dialog className="modal" id="on_account_delete_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">👋 Goodbye! We're sad to see you go.</h3>
        <p className="pt-4">Your account has been successfully deleted.</p>
        <p>If you ever decide to come back, we'll be here to welcome you again.</p>
        <p>Take care and best wishes!</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnAccountDelete };
