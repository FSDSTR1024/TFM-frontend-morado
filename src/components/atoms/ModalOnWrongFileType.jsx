/************************************************ Component Definition ************************************************/
const ModalOnWrongFileType = () => (
  <dialog className="modal" id="on_wrong_file_type_modal">
    <div className="modal-box">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
      </form>
      <h3 className="font-bold text-lg">🚫 Wrong file type!</h3>
      <p className="py-4">Please upload an image file.</p>
    </div>
  </dialog>
);

/********************************************** Named export (ES module) **********************************************/
export { ModalOnWrongFileType };