/************************************************ Component Definition ************************************************/
const ModalOnRegister = () => {
  return (
    <dialog className="modal" id="on_register_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">📧 Almost there!</h3>
        <p className="pt-4">You're just one step away.</p>
        <p>Please check your email and confirm your registration to complete the process.</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnRegister };
