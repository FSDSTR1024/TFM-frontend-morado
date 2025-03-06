/************************************************ Component Definition ************************************************/
const ModalOnRestaurantEdit = ({ email, name }) => {
  return (
    <dialog className="modal" id="on_restaurant_edit_modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{email}</h3>
        <p className="py-4">{name}</p>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnRestaurantEdit };
