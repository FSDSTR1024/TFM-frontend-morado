/************************************************ Component Definition ************************************************/
const ModalOnRegister = () => {
  return (
    <dialog className="modal" id="on_register_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">📧 Almost there! You're just one step away.</h3>
        <p className="pt-4">We have sent an email to the provided email.</p>
        <p>Please check your mail box and confirm your registration by pressing the button in it.</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnRegister };
