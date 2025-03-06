/************************************************ Component Definition ************************************************/
const ModalOnRegister = () => {
  return (
    <dialog className="modal" id="on_register_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">🎉 Welcome to the Nyam! club!</h3>
        <p className="py-4">You have been successfully registered.</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnRegister };
