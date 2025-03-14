/************************************************ Component Definition ************************************************/
const ModalOnUserValidActivation = () => {
  return (
    <dialog className="modal" id="on_user_valid_activation_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">🎉 Welcome to the Nyam! club!</h3>
        <p className="pt-4">Your account has been successfully activated.</p>
        <p>Now you can <a href="/login" className="link link-secondary no-underline">log in</a>, and enjoy all the web functionalities.</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnUserValidActivation };
