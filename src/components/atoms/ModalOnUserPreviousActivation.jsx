/************************************************ Component Definition ************************************************/
const ModalOnUserPreviousActivation = () => {
  return (
    <dialog className="modal" id="on_user_previous_activation_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">🤔 User Already Activated</h3>
        <p className="pt-4">The user you are trying to activate WAS already activated.</p>
        <p>No further action is needed, you can <a href="/login" className="link link-secondary no-underline">log in</a> freely.</p>
        <p className="pt-4">If you have any questions, feel free to reach out to support! 💬</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnUserPreviousActivation };
